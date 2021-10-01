from generic_crud import select_all_from_condition, insert_into, update_where_condition, delete_from_condition, load_db

def create_feature(name: str, topic: str, feat_type: int, value: str, device_id: int):
    return insert_into("feature", [name, topic, feat_type, value, device_id], columns=["name", "topic", "type", "value", "device_id"])

def get_feature(feature_id: int or None=None):
    if feature_id is None:
        return select_all_from_condition("feature")
    else:
        return select_all_from_condition("feature", condition=f"feature.id == {feature_id}")

def update_feature(feature_id: int, name: str, topic: str, feat_type: int, value: str):
    return update_where_condition("feature", [name, topic, feat_type, value], columns=["name", "topic", "type", "value"],
                                  condition=f"feature.id == {feature_id}")

def delete_feature(feature_id: int):
    return delete_from_condition("feature", condition=f"feature.id == {feature_id}")

if __name__ == "__main__":
    load_db("iot", "iothinks")