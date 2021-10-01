import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".." ))
from flask import request
from app import app
from crud.device import get_device, create_device, update_device, delete_device

@app.route('/create_device', methods=["POST"])
def create_device_route():
    name = request.form('name')
    desc = request.form('desc')
    ip = request.form('ip')
    port = request.form('port')
    colour = request.form('colour')
    user_id = int(request.form('user_id'))
    return create_device(name, desc, ip, port, colour, user_id)

@app.route('/get_device', methods=["GET"])
def get_device_route():
    device_id = request.form('device_id')
    if device_id:
        device_id = int(device_id)
    else:
        device_id = None

    return get_device(device_id)

@app.route('/update_device', methods=["PUT"])
def update_device_route():
    device_id = int(request.form('device_id'))
    name = request.form('name')
    email = request.form('email')
    passw = request.form('passw')
    colour = request.form('colour')
    if not passw:
        passw = None
    return update_device(device_id, name, email, passw, colour)

@app.route('/delete_device', methods=["DELETE"])
def delete_device_route():
    device_id = int(request.form('device_id'))

    return delete_device(device_id)