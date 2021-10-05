import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".."))
from flask import json, request, jsonify
from . import user
from crud.user import get_user, create_user, update_user, delete_user

@user.route('/create_user', methods=["POST"])
def create_user_route():
    name = request.form['name']
    email = request.form['email']
    passw = request.form['passw']
    colour = request.form['colour']
    return jsonify(create_user(name, email, passw, colour))

@user.route('/get_user', methods=["GET"])
def get_user_route():
    user_id = request.args['user_id']
    if user_id:
        user_id = int(user_id)
    else:
        user_id = None

    return jsonify(get_user(user_id))

@user.route('/update_user', methods=["PUT"])
def update_user_route():
    user_id = int(request.form['user_id'])
    name = request.form['name']
    email = request.form['email']
    passw = request.form['passw']
    colour = request.form['colour']
    if not passw:
        passw = None
    return jsonify(update_user(user_id, name, email, passw, colour))

@user.route('/delete_user', methods=["DELETE"])
def delete_user_route():
    user_id = int(request.form['user_id'])

    return jsonify(delete_user(user_id))
