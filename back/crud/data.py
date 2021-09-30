import datetime
from generic_crud import select_all_from_condition, select_from_condition, insert_into, delete_from_condition, load_db

def insert_data(feat_id: int, time: datetime.datetime, value: float):
    insert_into("data", [time, value, feat_id], columns=["time", "value", "feat_id"])

def get_data(feat_id: int, start: datetime.datetime or None=None, end: datetime.datetime or None=None):
    condition = f"data.feat_id == {feat_id} "
    if start is not None or end is not None:
        if start is None:
            start = datetime.datetime(1970, 1, 1)
        else:
            end = datetime.datetime.now()
        condition += f"AND data.time >= '{start}' AND data.time < '{end}'"
        reversed = False
        limit = None
    else:
        reversed = True
        limit = 1

    select_from_condition("data.time, data.value", condition=condition, order_by="data.time", order_desc=reversed, limit=limit)

def delete_data(feat_id: int or None=None, start: datetime.datetime or None=None, end: datetime.datetime or None=None):
    condition = ""
    if feat_id is not None:
        condition += f"data.feat_id == {feat_id} "
    if start is not None:
        condition += f"AND data.time >= '{start}' "
    if end is not None:
        condition += f"AND data.time < '{end}'"
    delete_from_condition("data", condition=condition)

if __name__ == "__main__":
    load_db("iot", "iothinks")