import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".."))
from flask import request, jsonify
from flask_cors import cross_origin
from . import feature
from crud.feature import get_feature, create_feature, update_feature, delete_feature

@feature.route('/create_feature', methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type'])
def create_feature_route():
    try:
        args = request.get_json()
        name = args['name']
        topic = args['topic']
        feat_type = args['feat_type']
        port = args['port']
        value = args['value']
        device_id = int(args['device_id'])
        return jsonify(create_feature(name, topic, feat_type, port, value, device_id))
    except:
        return jsonify(False)

@feature.route('/get_feature', methods=["GET"])
def get_feature_route():
    try:
        feature_id = request.args['feature_id']
        if feature_id:
            feature_id = int(feature_id)
        else:
            feature_id = None

        return jsonify(get_feature(feature_id))
    except:
        return jsonify(False)

@feature.route('/update_feature', methods=["PUT"])
@cross_origin(origin='*',headers=['Content-Type'])
def update_feature_route():
    try:
        args = request.get_json()
        feature_id = int(args['feature_id'])
        name = args['name']
        topic = args['topic']
        feat_type = args['feat_type']
        port = args['port']
        value = args['value']
        
        return jsonify(update_feature(feature_id, name, topic, feat_type, port, value))
    except:
        return jsonify(False)

@feature.route('/delete_feature', methods=["DELETE"])
@cross_origin(origin='*',headers=['Content-Type'])
def delete_feature_route():
    try:
        feature_id = int(request.get_json()['feature_id'])

        return jsonify(delete_feature(feature_id))
    except:
        return jsonify(False)