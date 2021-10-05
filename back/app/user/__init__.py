from flask import Blueprint

user = Blueprint("user", __name__, static_url_path="/user")

from . import views
