import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".."))
from flask import json, request, jsonify
from flask_cors import cross_origin
from . import user
from crud.user import get_user, create_user, update_user, delete_user, get_user_info, check_user_email, login

@user.route('/create_user', methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type'])
def create_user_route():
    args = request.get_json()
    name = args['name']
    email = args['email']
    passw = args['passw']
    colour = args['colour']
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
@cross_origin(origin='*',headers=['Content-Type'])
def update_user_route():
    args = request.get_json()
    user_id = int(args['user_id'])
    name = args['name']
    email = args['email']
    passw = args['passw']
    colour = args['colour']
    if not passw:
        passw = None
    return jsonify(update_user(user_id, name, email, passw, colour))

@user.route('/delete_user', methods=["DELETE"])
@cross_origin(origin='*',headers=['Content-Type'])
def delete_user_route():
    user_id = int(request.get_json()['user_id'])

    return jsonify(delete_user(user_id))

@user.route('/get_user_info', methods=["GET"])
def get_user_info_route():
    user_id = int(request.args['user_id'])

    return jsonify(get_user_info(user_id))

@user.route('/check_user_email', methods=["GET"])
def check_user_email_route():
    email = request.args['email']

    return jsonify(check_user_email(email))

@user.route('/login', methods=["GET"])
def login_route():
    email = request.args['email']
    passw = request.args['passw']
    print(email, passw)
    return jsonify(login(email, passw))
