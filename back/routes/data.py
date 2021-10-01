import os
import sys
from pathlib import Path

from back.crud.data import delete_data
sys.path.append(os.path.abspath(Path(os.getcwd()) / ".." ))
import datetime
from flask import request
from app import app
from crud.data import insert_data, get_data, delete_data

@app.route('/insert_data', methods=["POST"])
def insert_data_route():
    time = datetime.datetime.strptime(request.form('time'), "%Y-%m-%d %H:%M:%S")
    value = request.form('value')
    feat_id = request.form('feat_id')
    return insert_data(time, value, feat_id)

@app.route('/get_data', methods=["GET"])
def get_data_route():
    feat_id = request.form('feat_id')
    start = request.form('start')
    end = request.form('end')
    if start:
        start = datetime.datetime(start)
    else:
        start = None
    if end:
        end = datetime.datetime(end)
    else:
        end = None

    return get_data(feat_id, start, end)

@app.route('/delete_data', methods=["DELETE"])
def delete_data_route():
    feat_id = request.form('feat_id')
    start = request.form('start')
    end = request.form('end')
    if feat_id:
        feat_id = int(feat_id)
    else:
        feat_id = None
    if start:
        start = datetime.datetime(start)
    else:
        start = None
    if end:
        end = datetime.datetime(end)
    else:
        end = None

    return delete_data(feat_id, start, end)