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

class river:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # Init
    def __init__(self, db_connect):
        self.client = db_connect

    # populate_month
    # backfill the cfs, ph, and temp arrays
    # station: station id to perform operations on
    def populate_gnis(self, station):
        output = []
        with open('app/data/stations_gnis_casted.csv', 'r') as f:
            gnis_mappings = csv.DictReader(f)

            for item in gnis_mappings:
                if len(item['station_number']) < 8:
                    fluffed_id = '0%s' % (str(item['station_number']))
                else:
                    fluffed_id = item['station_number']
                try:
                    self.client[os.environ['MONGO_DB']].stations.find_one_and_update(
                        {'stationNumber': fluffed_id},
                        { '$set': {
                                'gnisId': item['gnis_id'],
                                'gnisName': item['gnis_name']
                            }
                        }
                    )

                    output.append(item)
                except Exception as e:
                    print(e)

            return(output)
