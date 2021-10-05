from passlib.hash import sha256_crypt
from back.app import device
from crud.generic_crud import select_all_from_condition, select_from_condition, insert_into, update_where_condition, delete_from_condition, load_db

def create_user(name: str, email: str, passw: str, colour: str):
    hashed_passw = sha256_crypt.hash(passw)
    return insert_into("user", [name, email, hashed_passw, colour], columns=["name", "email", "passw", "colour"])

def get_user(user_id: int or None=None):
    if user_id is None:
        return select_all_from_condition("user")
    else:
        return select_all_from_condition("user", condition=f"user.id == {user_id}")

def update_user(user_id: int, name: str, email: str, passw: str or None, colour: str):
    values = [name, email, colour]
    columns = ["name", "email", "passw", "colour"]
    if passw is not None:
        hashed_passw = sha256_crypt.hash(passw)
        values.append(hashed_passw)
        columns.append("passw")
    return update_where_condition("user", values, columns=columns, condition=f"user.id == {user_id}")

def delete_user(user_id: int):
    return delete_from_condition("user", condition=f"user.id == {user_id}")

def check_user_email(email: str):
    user_id = select_from_condition("user.id", condition=f"user.email = '{email}'")
    if user_id:
        return user_id[0]
    else:
        return False

def verify_passw(user_id: int, passw: str):
    hashed_passw = select_from_condition("user.passw", condition=f"user.id == {user_id}")
    if hashed_passw:
        hashed_passw = hashed_passw[0]
        return sha256_crypt.verify(passw, hashed_passw)
    else:
        return False

def get_user_info(user_id: int):
    devices = select_all_from_condition("device", condition=f"device.user_id = {user_id}")
    for d in devices:
        d['features'] = select_all_from_condition("feature", condition=f"feature.device_id = {d['id']}")

    return devices

def login(email: str, passw: str):
    user_id = check_user_email(email)
    if user_id:
        if verify_passw(user_id['id']):
            return {'login_status': user_id['id'], 'devices': get_user_info(user_id['id'])}
        else:
            return {'login_status': -2}  # Invalid password
    else:
        return {'login_status': -1}  # Invalid email

if __name__ == "__main__":
    load_db("iot", "iothinks")