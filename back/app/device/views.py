import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".."))
from flask import request, jsonify
from flask_cors import cross_origin
from . import device
from crud.device import get_device, create_device, update_device, delete_device

@device.route('/create_device', methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type'])
def create_device_route():
    try:
        args = request.get_json()
        print(args)
        name = args['name']
        desc = args['desc']
        ip = args['ip_address']
        port = args['port']
        colour = args['colour']
        user_id = int(args['user_id'])
        return jsonify(create_device(name, desc, ip, port, colour, user_id))
    except Exception as e:
        print(e)
        return jsonify(False)

@device.route('/get_device', methods=["GET"])
def get_device_route():
    try:
        device_id = request.args['device_id']
        if device_id:
            device_id = int(device_id)
        else:
            device_id = None

        return jsonify(get_device(device_id))
    except:
        return jsonify(False)

@device.route('/update_device', methods=["PUT"])
@cross_origin(origin='*',headers=['Content-Type'])
def update_device_route():
    try:
        args = request.get_json()
        device_id = int(args['device_id'])
        name = args['name']
        desc = args['desc']
        ip = args['ip']
        port = args['port']
        colour = args['colour']
        
        return jsonify(update_device(device_id, name, desc, ip, port, colour))
    except:
        return jsonify(False)

@device.route('/delete_device', methods=["DELETE"])
@cross_origin(origin='*',headers=['Content-Type'])
def delete_device_route():
    try:
        device_id = int(request.get_json()['device_id'])

        return jsonify(delete_device(device_id))
    except:
        return jsonify(False)
