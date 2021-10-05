from flask import Blueprint

data = Blueprint("data", __name__, static_url_path="/data")

from . import views