import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".."))
from flask import request, jsonify
from . import feature
from crud.feature import get_feature, create_feature, update_feature, delete_feature

@feature.route('/create_feature', methods=["POST"])
def create_feature_route():
    name = request.form['name']
    topic = request.form['topic']
    feat_type = request.form['feat_type']
    port = request.form['port']
    value = request.form['value']
    device_id = int(request.form['device_id'])
    return jsonify(create_feature(name, topic, feat_type, port, value, device_id))

@feature.route('/get_feature', methods=["GET"])
def get_feature_route():
    feature_id = request.args['feature_id']
    if feature_id:
        feature_id = int(feature_id)
    else:
        feature_id = None

    return jsonify(get_feature(feature_id))

@feature.route('/update_feature', methods=["PUT"])
def update_feature_route():
    feature_id = int(request.form['feature_id'])
    name = request.form['name']
    topic = request.form['topic']
    feat_type = request.form['feat_type']
    port = request.form['port']
    value = request.form['value']
    
    return jsonify(update_feature(feature_id, name, topic, feat_type, port, value))

@feature.route('/delete_feature', methods=["DELETE"])
def delete_feature_route():
    feature_id = int(request.form['feature_id'])

    return jsonify(delete_feature(feature_id))