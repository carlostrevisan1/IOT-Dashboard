from app import app
from flask_cors import CORS
from crud.generic_crud import load_db

load_db("iot", "iothinks")
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
app.run("0.0.0.0", 5000, debug=True)