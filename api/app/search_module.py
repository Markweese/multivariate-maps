# Dev only
import ssl
# Dev only

import os
import csv
import json
import numpy as np
from io import StringIO
from bson.objectid import ObjectId
from datetime import date, datetime
from collections import defaultdict
from urllib.request import urlopen, Request

class search:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # Init
    def __init__(self, db_connect):
        self.client = db_connect

    # get_all_assets
    def search_assets(self, term):
        output_obj = {'term': term, 'stations': [], 'rivers': [], 'rapids': [], 'reservoirs': []}

        # TODO:rapids, reports, companies, articles, reservoirs (fucking USBR...)
        rivers = self.client[os.environ['MONGO_DB']].rivers.find(
            {'name': {'$regex': term, '$options' :'i'}},
            {'name': 1, 'gnisId': 1, 'states': 1}
        );
        reservoirs = self.client[os.environ['MONGO_DB']].reservoirs.find(
            {'name': {'$regex': term, '$options' :'i'}},
            {'name': 1, 'resId': 1}
        );
        stations = self.client[os.environ['MONGO_DB']].stations.find(
            {'name': {'$regex': term, '$options' :'i'}},
            {'name': 1, 'stationNumber': 1, 'gnisId': 1}
        );

        output_obj['stations'] = list(stations)
        output_obj['rivers'] = list(rivers)
        output_obj['reservoirs'] = list(reservoirs)

        return output_obj
