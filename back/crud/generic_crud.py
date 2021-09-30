#-*- coding: utf-8 -*-
import sqlalchemy as db
import re

# connection variables
engine   = None
metadata = None

def load_db(username='', password='', db_name='iotdashboard', host='localhost'):
    """Load the database
    
    Keyword Arguments:
        db_name {str} -- database name (default: {'clquickium'})
        username {str} -- username with write and read permissions on given database (default: {''})
        password {str} -- user's password (default: {''})
        host {str} -- host of mariadb/mysql server (default: {'localhost'})
    """
    global engine, metadata
    url = f'mysql+mysqlconnector://{username}:{password}@{host}/{db_name}'
    engine = db.create_engine(url, pool_size=512, max_overflow=0)
    metadata = db.MetaData()
    table_names = engine.table_names()
    table = {}
    for table_name in table_names:
        try:
            table[table_name] = db.Table(table_name, metadata, autoload=True, autoload_with=engine)
            # print(f"table '{table_name}' loaded")
        except:
            print(f"Failed to load database")
    print(f"Database '{db_name}' loaded")
    return engine, metadata, table
    

def list_foreign_keys(source):
    # return a list of all foreign_key columns
    for column in source.columns:
        if column.foreign_keys:
            yield column


def list_parents(foreign_keys):
    # get all table instances from metadata
    all_tables = metadata.tables
    for frg_key in foreign_keys:
        # # frg_keys.foreign_keys = {ForeignKey('<table>.<column>')}
        parent_name, parent_column_name = str(frg_key.foreign_keys).split("'")[1].split(".")
        # has an actual table parent
        if parent_name in all_tables.keys():
            parent        = all_tables[parent_name]
            parent_column = parent.c.get(parent_column_name)
            yield [parent, parent_column]


def bind_parent(query, source, target):
    """Return the given query with all relations linking source to target
    
    Arguments:
        query {sqlalchemy.sql.dml.*/sqlalchemy.sql.selectable.*} -- SQL statments what can use where condition
        source {sqlalchemy.sql.schema.Table} -- SQLAlchemy Table class of source table
        target {sqlalchemy.sql.schema.Table} -- SQLAlchemy Table class of target father table
    
    Returns:
        sqlalchemy.sql.dml.*/sqlalchemy.sql.selectable.* -- SQL statment with all relations needed
    """
    frg_keys_list = [_ for _ in list_foreign_keys(source)]
    # any parent found
    if not frg_keys_list:
        return False
    
    # get a list of parent table and column instances on same order than frg_keys_list
    parent_list = [_ for _ in list_parents(frg_keys_list)]

    # found target
    if target in [tab for tab,col in parent_list]:
        # get index of parent and his table and column instances
        ind, parent_info = [[i,parent] for i,parent in enumerate(parent_list) if parent[0] == target][0]

        source_fk  = frg_keys_list[ind]
        target_key = parent_info[1]

        # return successfuly query
        return query.where(source_fk == target_key)
    
    # found parent and did not find target
    for ind, [parent, parent_column] in enumerate(parent_list):
        result_query = bind_parent(query, parent, target)
        if result_query == False:
            continue
        
        # get source foreign key to append in query
        source_fk = frg_keys_list[ind]
        return result_query.where(source_fk == parent_column)
    return False


def select_from_condition(source, condition=(), order_by=None, order_desc=False, limit=None, return_type="dict", distinct=False, all_source=False):
    """Get all information of the given columns based in condition
    
    Arguments:
        source {sqlalchemy.sql.schema.Table/str} -- Columns name separated by ','
            (E.g. "user.user_id AS id, user.name, user.last_name AS second_name")
    
    Keyword Arguments:
        condition {str} -- SQLAlchemy expression to set 'where' (default: {()})
        order_by {sqlalchemy.sql.schema.Column/str} -- SQLAlchemy Column class to order the query result (default: {None})
        order_desc {bool} -- Needs 'order_by' key parameter, if true return the result in decrescent order (default: {False})
        limit {int} -- Return amount limit, by default return all rows found (default: {None})
        return_type {str} -- Format to return, invalid formats will return the default format (default: {"dict"})
            dict  - list of dicts with keys based on source columns name
            list  - list of tuples, default return of SQLAlchemy fetchall method
            query - SQLAlchemy query with all relations needed to execute the given condition, no alias included
            int   - number of rows returned by query
        distinct {bool} -- Remove all duplicated result data (default: {False})
        all_source {bool} -- Internal key to exclusive use for "select_all" (default: {False})

    Returns:
        * -- All information returned by query condition based on return_type keyword argument
    """

    if all_source:
        # only when called by "select_all_from_condition"
        if type(source) == str:
            source = metadata.tables[source]
        query = db.select([source])
    else:
        # format alias as "[{alias/column: table.column}, ...]"
        alias = list(map(lambda c: ({c.split(' AS ')[1].replace(' ',''):c.split(' AS ')[0].replace(' ','')}) if ' AS ' in c else ({c.replace(' ','').split('.')[1]:c.replace(' ','')}), source.split(',')))
        
        # format column_alias as "{alias/column: table.column, ...}"
        column_alias = {}
        for col in alias:
            column_alias.update(col)

        # get the first column "table.column" to set source
        source = list(column_alias.values())[0].split('.')[0]
        source = metadata.tables[source]

        columns = list(map(lambda c: c.split('.')[1], list(column_alias.values())))
        query   = db.select(list(map(lambda c: source.c[c], columns)))

    # get table names from list of condition keywords
    keywords = re.split(" AND | OR | = | < | > | <= | >= | == | != |\(|\)| LIKE ", str(condition))
    keywords = [_.replace(" ", "") for _ in keywords if _ != ""]

    tables = []
    # has one or more conditions
    if len(keywords) > 1:
        # get all table names and remove repeated ones
        table_names = [_.split(".")[0] for _ in keywords if "." in _ and _.split(".")[0] in metadata.tables]
        table_names = list(dict.fromkeys(table_names))

        # remove source from table_names
        if source.name in table_names:
            table_names.remove(source.name)

        # get all tables found based on names
        tables = [metadata.tables[_] for _ in table_names]

        # pass condition to query, if is a string convert to sqlalchemy text
        if type(condition) == str:
            # replace '==' to '=' and convert null queries to correct SQL sintax
            condition = condition.replace("==","=").replace("null","NULL").replace("!= NULL","IS NOT NULL").replace("= NULL","IS NULL")
            query = query.where(db.sql.text(condition))
        else:
            query = query.where(condition)
    
        # pass order to query
        if type(order_by) != type(None):
            # if order_by is a string get column and table instances
            if type(order_by) == str:
                order_table_name, order_column_name = order_by.split(".")
                order_table = metadata.tables[order_table_name]
                order_by    = order_table.c[order_column_name]

                # if the table to order is not on list of tables to bind parent append it in
                if order_table_name not in table_names:
                    tables.append(order_table)

            # set order based on decrescent or not
            if not order_desc:
                query = query.order_by(order_by)
            else:
                query = query.order_by(order_by.desc())

    # get parent bindings
    for target in tables:
        new_query = bind_parent(query, source, target)
        
        # if has no parent bind try bind a child (from target to source)
        if new_query == False:
            new_query = bind_parent(query, target, source)
        
        # pass new query if has a successful bind
        if new_query != False:
            query = new_query
    
    # limit the result amount if needed
    if limit:
        query = query.limit(limit)

    # Adding DISTINCT to the query
    if distinct:
        query = query.distinct()

    # return query
    if return_type == "query":
        return query
        
    # select data on database
    conn     = engine.connect()
    result   = conn.execute(query)
    response = result.fetchall()
    conn.close()

    # get just the len of response
    if return_type == "int":
        response = len(response)

    # convert response to dict with the format based on source table columns
    if return_type == "dict":
        columns  = [col.name for col in source.c] if all_source else list(column_alias.keys())
        response = [dict(zip(columns, values)) for values in response]

    return response

def select_all_from_condition(source, condition=(), order_by=None, order_desc=False, limit=None, return_type="dict", distinct=False):
    """Get all information of the given table based in condition
    
    Arguments:
        source {sqlalchemy.sql.schema.Table/str} --  SQLAlchemy Table class of source table or its name
    
    Keyword Arguments:
        condition {sqlalchemy.sql.elements.BynaryExpression/str} -- SQLAlchemy expression to set 'where' (default: {()})
        order_by {sqlalchemy.sql.schema.Column/str} -- SQLAlchemy Column class to order the query result (default: {None})
        order_desc {bool} -- Needs 'order_by' key parameter, if true return the result in decrescent order (default: {False})
        limit {int} -- Return amount limit, by default return all rows found (default: {None})
        return_type {str} -- Format to return, invalid formats will return the default format (default: {"dict"})
            dict  - list of dicts with keys based on source columns name
            list  - list of tuples, default return of SQLAlchemy fetchall method
            query - SQLAlchemy query with all relations needed to execute the given condition
            int   - number of rows returned by query
        distinct {bool} -- Remove all duplicated result data (default: {False})

    Returns:
        * -- All information returned by query condition based on return_type keyword argument
    """
    if type(source) == str:
        source = metadata.tables[source]
    return select_from_condition(source, condition, order_by, order_desc, limit, return_type, distinct, all_source=True)

def insert_into(table, values, columns=None, return_id=False):
    """Insert values into table
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or its name
        values {int/str/list} -- Value to insert, a list of values (where each value is in each column) or a list of lists
    
    Keyword Arguments:
        columns {sqlalchemy.sql.schema.Column/str/list} -- SQLAlchemy Column class or its name, or a list of them,
            by default is all columns of the given table (default: {None})
        return_id {bool} -- If has only one value to insert, if True returns the inserted data id (default: {False})
    
    Raises:
        Exception: Amount of values (<>) and columns (<>) doesn't match.
    
    Returns:
        bool -- If has successfully insert of all given values
    """
    if type(table) == str:
        table = metadata.tables[table]

    # by default get all columns in a list
    if columns == None:
        columns = [str(_.name) for _ in table.c]
    elif type(columns) != list:
        columns = [columns]

    # check if has an instance and change to instance name
    for col in columns:
        if type(col) != str:
            columns[columns.index(col)] = col.name

    if type(values) != list:
        # its just one value
        if len(columns) <= 1:
            # has one column to one value
            insert_values = {columns[0]:values}
        else:
            raise Exception(f"Amount of values ({values}) and columns ({columns}) doesn't match.")
    elif type(values) == list:
        if type(values[0]) != list:
            # its just one list of values
            insert_values = dict(zip(columns,values))
        else:
            # its multiples lists of values
            insert_values = [dict(zip(columns, vals)) for vals in values]
    else:
        return False

    # execute insert into database
    conn   = engine.connect()
    query  = table.insert(insert_values)
    result = conn.execute(query)

    # if has just one value to insert and is requested
    if return_id:
        lastid = result.lastrowid
        conn.close()
        return lastid
    conn.close()

    return True

def delete_from_condition(table, condition=()):
    """Delete all information from given table with the given condition
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or his name
    
    Keyword Arguments:
        condition {sqlalchemy.sql.elements.BynaryExpression/str} -- SQLAlchemy expression to set 'where' (default: {()})
    
    Returns:
        bool/int -- If has successfully delete all information with the given condition, returns matched rows
    """
    if type(table) == str:
        table = metadata.tables[table]

    query = table.delete()

    # get table names from list of condition keywords
    keywords = re.split(" AND | OR | = | < | > | <= | >= | == | != |\(|\)| LIKE ", str(condition))
    keywords = [_.replace(" ", "") for _ in keywords if _ != ""]


    tables = []
    # has one or more conditions
    if len(keywords) > 1:
        # get all table names and remove repeated ones
        table_names = [_.split(".")[0] for _ in keywords if "." in _ and _.split(".")[0] in metadata.tables]
        table_names = list(dict.fromkeys(table_names))

        # remove table from table_names
        if table.name in table_names:
            table_names.remove(table.name)

        # get all tables found based on names
        tables = [metadata.tables[_] for _ in table_names]

        # pass condition to query, if is a string convert to sqlalchemy text
        if type(condition) == str:
            condition = condition.replace("==","=").replace("null","NULL").replace("!= NULL","IS NOT NULL").replace("= NULL","IS NULL")
            query = query.where(db.sql.text(condition))
        else:
            query = query.where(condition)
    
    # get parent bindings
    for target in tables:
        new_query = bind_parent(query, table, target)
        if new_query != False:
            query = new_query

    # execute delete into database
    conn = engine.connect()
    result = conn.execute(query)
    conn.close()

    return result.rowcount

def update_where_condition(table, values, columns=None, condition=()):
    """Update values in the given table with the given condition
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or his name
        values {int/str/list} -- Value to insert, a list of values (where each value is in each column) or a list of lists
    
    Keyword Arguments:
        columns {sqlalchemy.sql.schema.Column/str/list} -- SQLAlchemy Column class or his name, or a list of them,
            by default is all columns of the given table (default: {None})
        condition {sqlalchemy.sql.elements.BynaryExpression/str} -- SQLAlchemy expression to set 'where' (default: {()})
    
    Raises:
        Exception: Amount of values (<>) and columns (<>) doesn't match.
    
    Returns:
        bool -- If has successfully update all information with the given condition
    """
    if type(table) == str:
        table = metadata.tables[table]
    
    query = table.update()

    # get table names from list of condition keywords
    keywords = re.split(" AND | OR | = | < | > | <= | >= | == | != |\(|\)| LIKE ", str(condition))
    keywords = [_.replace(" ", "") for _ in keywords if _ != ""]

    tables = []
    # has one or more conditions
    if len(keywords) > 1:
        # get all table names and remove repeated ones
        table_names = [_.split(".")[0] for _ in keywords if "." in _ and _.split(".")[0] in metadata.tables]
        table_names = list(dict.fromkeys(table_names))

        # remove table from table_names
        if table.name in table_names:
            table_names.remove(table.name)

        # get all tables found based on names
        tables = [metadata.tables[_] for _ in table_names]

        # pass condition to query, if is a string convert to sqlalchemy text
        if type(condition) == str:
            condition = condition.replace("==","=").replace("null","NULL").replace("!= NULL","IS NOT NULL").replace("= NULL","IS NULL")
            query = query.where(db.sql.text(condition))
        else:
            query = query.where(condition)
    
    # get parent bindings
    for target in tables:
        new_query = bind_parent(query, table, target)
        if new_query != False:
            query = new_query

    # by default get all columns in a list
    if columns == None:
        columns = [str(_.name) for _ in table.c]
    elif type(columns) != list:
        columns = [columns]

    # check if has an instance and change to instance name
    for col in columns:
        if type(col) != str:
            columns[columns.index(col)] = col.name

    if type(values) != list:
        # its just one value
        if len(columns) <= 1:
            # has one column to one value
            update_values = {columns[0]:values}
        else:
            raise Exception(f"Amount of values ({values}) and columns ({columns}) doesn't match.")
    elif type(values) == list:
        update_values = dict(zip(columns,values))
    else:
        return False

    # execute update into database
    conn  = engine.connect()
    query = query.values(update_values)
    conn.execute(query)
    conn.close()

    return True


def in_condition(column, values):
    """Format a list of values to work like the 'IN' statment from SQL

    Arguments:
        column {str} -- The database column the condition will look at. e.g.: If you are looking at the column 'apikey' in the table 'gateway', the column
                        must be 'gateway.apikey'.
        values {list} -- List of values that it will be accepted for the given column. Note that if the value it's a string, it must contain the single quotes
                         surrounding it inside the double quotes. 
                         e.g.: If you're looking for the apikeys 1515w1478s and 1516x1746d your list must be: ["'1515w1478s'", "'1516x1746d'"].
    
    Returns:
        str -- A string of the condition the will be accepted by generic_crud.select_all_from_condition. e.g.: If the 2 examples above were passed the return
               would be: gateway.apikey =  '1515w1478s' OR gateway.apikey = '1516x1746d'"
    """
    condition = ''
    for i,v in enumerate(values):
        if type(v) == str:
            condition += f"{column} = '{v}'"
        else:
            condition += f"{column} = {v}"
        if i < len(values)-1:
            condition += " OR "
    return f" ({condition}) " if condition else " "


def not_in_condition(column, values):
    """Format a list of values to work like the 'NOT IN' statment from SQL

    Arguments:
        column {str} -- The database column the condition will look at. e.g.: If you are looking at the column 'apikey' in the table 'gateway', the column
                        must be 'gateway.apikey'.
        values {list} -- List of values that won't be accepted for the given column. Note that if the value it's a string, it must contain the single quotes
                         surrounding it inside the double quotes. 
                         e.g.: If you're looking for the apikeys 1515w1478s and 1516x1746d your list must be: ["1515w1478s", "1516x1746d"].
    
    Returns:
        str -- A string of the condition the will be accepted by generic_crud.select_all_from_condition. e.g.: If the 2 examples above were passed the return
               would be: gateway.apikey !=  '1515w1478s' AND gateway.apikey != '1516x1746d'"
    """
    condition = ''
    for i,v in enumerate(values):
        if type(v) == str:
            condition += f"{column} != '{v}'"
        else:
            condition += f"{column} != {v}"
        if i < len(values)-1:
            condition += " AND "
    return f" ({condition}) " if condition else " "


def show_tables():
    """Show all tables
    
    Returns:
        list -- List of strings with name of all tables
    """
    return list(metadata.tables)


def describe_table(table, return_type="dict"):
    """Return the type of each column on table
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or his name
    
    Keyword Arguments:
        return_type {str} -- Format to return, invalid formats will return the default format (default: {"dict"})
            dict - dict who each key is a column and his value is the respective type
            list - list of strings with just the types ordened according columns in table
    
    Returns:
        * -- All column types based on return_type keyword argument
    """
    if type(table) == str:
        table = metadata.tables[table]

    # get column types
    column_types = [str(col.type) for col in table.c]
    if return_type == "list":
        return column_types

    # get column names to mount dict
    column_names = [str(col.name) for col in table.c]
    columns = dict(zip(column_names, column_types))

    return columns


def get_parent(table):
    """Return parents of the given table
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or his name
    
    Returns:
        list -- List of table names who is parent of given table
    """
    if type(table) == str:
        table = metadata.tables[table]
    
    # get all parents in 'table'
    parents = [str(_.foreign_keys).split("'")[1].split(".")[0] for _ in table.c if _.foreign_keys]

    return parents


def get_children(table):
    """Return childrens of the given table
    
    Arguments:
        table {sqlalchemy.sql.schema.Table/str} -- SQLAlchemy Table class of source table or his name
    
    Returns:
        list -- List of table names who is children of given table
    """
    if type(table) != str:
        table = table.name
    
    # get all parent names for each table (accept, don't ask, its the easy way)
    parent_list = {_:[str(col.foreign_keys).split("'")[1].split(".")[0] for col in metadata.tables[_].c if col.foreign_keys] for _ in metadata.tables}
    
    # get tables that have 'table' as parent
    childrens = [_ for _ in parent_list if _ != table and table in parent_list[_]]

    return childrens


def export_csv(query, path="./export_query.csv", columns=None, sep=","):
    """Generate and export an csv file with given query information
    
    Arguments:
        query {sqlalchemy.sql.selectable.Select} -- SQLAlchemy query to get information
    
    Keyword Arguments:
        path {str} -- Path to create the archive 'path/to/file.csv' (default: {"./export_query.csv"})
        columns {list} -- A list of column names, by default is query column names (default: {None})
        sep {str} -- Separator of csv archive (default: {","})
    """
    if columns == None:
        columns = str(query).split("\n")[0][7:].split(", ")

    # set head names
    columns = sep.join(columns) + "\n"

    # select data on database
    conn     = engine.connect()
    result   = conn.execute(query)
    response = result.fetchall()
    conn.close()

    # open archive to write
    with open(path, "w") as f:
        f.write(columns)

        # write query information
        for res in response:
            f.write(f"{sep.join([str(_) for _ in res])}\n")

    print(f"Successfully exported to '{path}'.")
