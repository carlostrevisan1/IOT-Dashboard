from flask import Blueprint

device = Blueprint("device", __name__, static_url_path="/device")

from . import views