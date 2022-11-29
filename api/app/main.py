import os
import json
import flask
import logging
from flask import request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from flask import request, render_template
from sample_module import sample as sample_module
from sample_utils import sample_utils as sample_utils

app = flask.Flask(__name__)
app.config["DEBUG"] = True
logging.getLogger('werkzeug').setLevel(logging.ERROR)
logging.basicConfig(filename='api_errors.log',level=logging.ERROR, format='%(asctime)s %(message)s')
# for a db conn (mongodb)
# connection_string='mongodb+srv://{}:{}@river-collective.f0lz3.mongodb.net/{}?retryWrites=true&w=majority'.format(os.environ['MONGO_USERNAME'], os.environ['MONGO_PASSWORD'], os.environ['MONGO_DB'])
# when db conn needed
# client = MongoClient(connection_string)
# pass client to class instantiation - sample_module(client)

# instantiate sample module to be persistent across calls, we only want to build the dataframe once per session
sample = sample_module()

success_res = dict(
    code=1,
    message='success'
)
fail_res = dict(
    code=0,
    message='failure'
)
auth_failure_res = dict(
    code=401,
    message='unauthenticated'
)

# API Documentation
@app.route('/', methods=['GET'])
def docs():
    return render_template('api_docs.html')

# ------ The only endpoint called from our node application -------

# routes
# get all region data for choropleth
@app.route('/regions/all', methods=['GET'])
def get_regions():
    try:
        start_month = request.args.get('start_month')
        end_month = request.args.get('end_month')
        output = sample.get_region_data(start_month, end_month)

        return jsonify(dict(
            code=1,
            message='success',
            response=output
        ))
    except Exception as e:
        print(e)
        logging.error(request.path, exc_info=True)
        return fail_res

@app.route('/metros', methods=['GET'])
def get_metros():
    try:
        start_month = request.args.get('start_month')
        end_month = request.args.get('end_month')
        metros = request.args.get('metros')

        output = sample.get_metro_data(metros, start_month, end_month)

        return jsonify(dict(
            code=1,
            message='success',
            response=output
        ))
    except Exception as e:
        print(e)
        logging.error(request.path, exc_info=True)
        return fail_res

@app.route('/metros/forecast', methods=['GET'])
def get_forecast():
    try:
        start_month = request.args.get('start_month')
        end_month = request.args.get('end_month')
        metros = request.args.get('metros')

        output = sample.get_forecast_data(metros, start_month, end_month)

        return jsonify(dict(
            code=1,
            message='success',
            response=output
        ))
    except Exception as e:
        print(e)
        logging.error(request.path, exc_info=True)
        return fail_res

if __name__ == '__main__':
    app.run(host='0.0.0.0')
