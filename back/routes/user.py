import os
import sys
from pathlib import Path
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".." ))
from flask import request
from app import app
from crud.user import get_user, create_user, update_user, delete_user

@app.route('/create_user', methods=["POST"])
def create_user_route():
    name = Request
    create_user(name, email, passw, colour)