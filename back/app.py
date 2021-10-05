from app import app
from crud.generic_crud import load_db

load_db("iot", "iothinks")
app.run("0.0.0.0", 5000, debug=True)