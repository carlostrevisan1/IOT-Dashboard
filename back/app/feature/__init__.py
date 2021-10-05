from flask import Blueprint

feature = Blueprint("feature", __name__, static_url_path="/feature")

from . import views