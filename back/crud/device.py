from generic_crud import select_all_from_condition, insert_into, update_where_condition, delete_from_condition, load_db

def create_device(name: str, desc: str, ip: str, port: str, colour: str, user_id: int):
    return insert_into("device", [name, desc, ip, port, colour, user_id], columns=["name", "desc", "ip", "port", "colour", "user_id"])

def get_device(device_id: int or None=None):
    if device_id is None:
        return select_all_from_condition("device")
    else:
        return select_all_from_condition("device", condition=f"device.id == {device_id}")

def update_device(device_id: int, name: str, desc: str, ip: str, port: str, colour: str, user_id: int):
    return update_where_condition("device", [name, desc, ip, port, colour, user_id], columns=["name", "desc", "ip", "port", "colour", "user_id"],
                                  condition=f"device.id == {device_id}")

def delete_device(device_id: int):
    return delete_from_condition("device", condition=f"device.id == {device_id}")

if __name__ == "__main__":
    load_db("iot", "iothinks")