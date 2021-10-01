import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".." ))
from flask import request
from app import app
from crud.user import get_user, create_user, update_user, delete_user

@app.route('/create_user', methods=["POST"])
def create_user_route():
    name = request.form('name')
    email = request.form('email')
    passw = request.form('passw')
    colour = request.form('colour')
    return create_user(name, email, passw, colour)

@app.route('/get_user', methods=["GET"])
def get_user_route():
    user_id = request.form('user_id')
    if user_id:
        user_id = int(user_id)
    else:
        user_id = None

    return get_user(user_id)

@app.route('/update_user', methods=["PUT"])
def update_user_route():
    user_id = int(request.form('user_id'))
    name = request.form('name')
    email = request.form('email')
    passw = request.form('passw')
    colour = request.form('colour')
    if not passw:
        passw = None
    return update_user(user_id, name, email, passw, colour)

@app.route('/delete_user', methods=["DELETE"])
def delete_user_route():
    user_id = int(request.form('user_id'))

    return delete_user(user_id)
