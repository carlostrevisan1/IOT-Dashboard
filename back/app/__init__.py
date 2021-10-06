from flask import Flask
# from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

from app.data import data as data_bp
app.register_blueprint(data_bp)

from app.device import device as device_bp
app.register_blueprint(device_bp)

from app.feature import feature as feature_bp
app.register_blueprint(feature_bp)

from app.user import user as user_bp
app.register_blueprint(user_bp)