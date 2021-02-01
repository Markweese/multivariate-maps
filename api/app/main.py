import os
import flask
import logging
from flask import request
from pymongo import MongoClient
import gridfs
from bson.json_util import dumps
from flask import request, render_template
from snotel_module import snotel as snotel_module
from station_module import station as station_module
from station_utils import station_utils as station_utils
from reservoir_module import reservoir as reservoir_module
from authentication_module import authentication as authentication_module

app = flask.Flask(__name__)
app.config["DEBUG"] = True
logging.getLogger('werkzeug').setLevel(logging.ERROR)
logging.basicConfig(filename='api_errors.log',level=logging.ERROR, format='%(asctime)s %(message)s')
connection_string='mongodb+srv://{}:{}@river-collective.f0lz3.mongodb.net/{}?retryWrites=true&w=majority'.format(os.environ['MONGO_USERNAME'], os.environ['MONGO_PASSWORD'], os.environ['MONGO_DB'])

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

# Station routes
@app.route('/station/new/<id>', methods=['GET'])
def station_new(id):
    client = MongoClient(connection_string)
    snotel = snotel_module(client)
    station = station_module(client)
    reservoir = reservoir_module(client)
    authentication = authentication_module(client)

    if authentication.authenticate_session(request) == False:
        return auth_failure_res

    try:
        station.populate_historic(id)
        station.populate_month(id)
        station.populate_day(id)

        # reservoir.populate_historic(id, True)
        # reservoir.populate_daily(id, True)
        # reservoir.populate_year(id, True)

        snotel.populate_historic(id, True)
        snotel.populate_daily(id, True)
        snotel.populate_year(id, True)

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

# ------- The following endpoints should only be called by our GCP service account --------

@app.route('/stations/refresh', methods=['GET'])
def station_refresh():
    client = MongoClient(connection_string)
    station = station_module(client)
    authentication = authentication_module(client)

    if authentication.is_super_admin(request) == False:
        return auth_failure_res

    try:
        station.refresh_stations()

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

@app.route('/stations/refresh/all', methods=['GET'])
def station_refresh_all():
    client = MongoClient(connection_string)
    snotel = snotel_module(client)
    station = station_module(client)
    reservoir = reservoir_module(client)
    utils = station_utils(client)
    authentication = authentication_module(client)

    if authentication.is_super_admin(request) == False:
        return auth_failure_res

    try:
        stations = utils.get_user_stations()

        for i, id in enumerate(stations):
            print('build {} of {}'.format(i,len(stations)))

            try:
                station.populate_historic(id)
                station.populate_month(id)
                station.populate_day(id)

                # reservoir.populate_historic(id, True)
                # reservoir.populate_daily(id, True)
                # reservoir.populate_year(id, True)

                snotel.populate_historic(id, True)
                snotel.populate_daily(id, True)
                snotel.populate_year(id, True)

            except Exception as e:
                logging.error('/stations/refresh/all: error loading data for {}'.format(id), exc_info=True)
                continue

    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

# SNOTEL Routes
@app.route('/snotel/new/<id>', methods=['GET'])
def snotel_new(id):
    client = MongoClient(connection_string)
    snotel = snotel_module(client)

    try:
        snotel.populate_historic(id, False)
        snotel.populate_daily(id, False)
        snotel.populate_year(id, False)

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

@app.route('/snotel/refresh', methods=['GET'])
def snotel_refresh():
    client = MongoClient(connection_string)
    snotel = snotel_module(client)
    authentication = authentication_module(client)

    if authentication.is_super_admin(request) == False:
        return auth_failure_res

    try:
        snotel.refresh_snotel()

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

# Reservoir Routes
@app.route('/reservoir/new/<id>', methods=['GET'])
def reservoir_new(id):
    client = MongoClient(connection_string)
    reservoir = reservoir_module(client)

    try:
        reservoir.populate_historic(id, False)
        reservoir.populate_daily(id, False)
        reservoir.populate_year(id, False)

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

@app.route('/reservoirs/refresh', methods=['GET'])
def reservoir_refresh():
    client = MongoClient(connection_string)
    reservoir = reservoir_module(client)
    authentication = authentication_module(client)

    if authentication.is_super_admin(request) == False:
        return auth_failure_res

    try:
        reservoir.refresh_reservoirs()

        return success_res
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

######################## Begin Non-cron job API routes for application consumption ##########################

@app.route('/stations/state/<fip>', methods=['GET'])
def get_state(fip):
    client = MongoClient(connection_string)
    station = station_module(client)

    try:
        output = station.get_by_state(fip)
        return dumps(output)
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

@app.route('/stations/user/<id>', methods=['GET'])
def get_stations(id):
    client = MongoClient(connection_string)
    station = station_module(client)

    try:
        output = station.get_stations(id)
        return dumps(output)
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

@app.route('/upload-user-photo', methods=['POST'])
def upload_user_photo():
    client = MongoClient(connection_string)
    fs = gridfs.GridFS(client[os.environ['MONGO_DB']])
    photo = request.files['photo']
    authentication = authentication_module(client)

    print(photo)
    
    if authentication.authenticate_session(request) == False:
        return auth_failure_res

    try:
        write = fs.put(photo)
        return dict(
            code=1,
            id=fs.get(write).read()
        )
    except Exception as e:
        logging.error(request.path, exc_info=True)
        return fail_res

    client.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0')
