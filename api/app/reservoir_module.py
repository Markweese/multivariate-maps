# Dev only
import ssl
# Dev only

import os
import csv
import json
import numpy as np
from pymongo import MongoClient
from collections import defaultdict
from datetime import date, datetime
from urllib.request import urlopen, Request
from reservoir_utils import reservoir_utils as utils

class reservoir:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # today: todays date
    # date_compare: formats the date for comparison in populate_month
    # client: the mongodb client instance
    today = date.today()
    date_compare = "{}/{}".format(today.month, today.day)

    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        self.utils = utils(db_connect)
        print('init reservoir_module')

    # Methods

    # populate_historic
    # compile historic data for a reservoir
    # id: takes either a usgs or usbr id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_historic(self, id, usgs=False):
        reservoirs = self.utils.get_reservoirs(id, usgs)

        for reservoir in reservoirs:
            rdb = self.utils.get_historic_rdb(reservoir['resId'])
            rdb_parsed = self.utils.compile_historic_rdb(rdb)

            self.client[os.environ['MONGO_DB']].reservoirs.update_one({ 'resId': reservoir['resId'] }, { '$set':{ 'historicDaily': rdb_parsed }})

    # populate_year
    # compile monthly stats
    # id: takes either a usgs or usbr id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_year(self, id, usgs=False):
        reservoirs = self.utils.get_reservoirs(id, usgs)

        for reservoir in reservoirs:
            # Get historic stats to append to reading
            data = self.utils.get_monthly(reservoir)
            compiled_monthly = self.utils.compile_monthly(data, reservoir)
            storage_monthly = self.utils.get_monthly_historic(compiled_monthly, reservoir)
            self.client[os.environ['MONGO_DB']].reservoirs.update_one({'resId':reservoir['resId']}, {'$set':{'storageMonthly':storage_monthly}})

    # populate_daily
    # compile daily stats for last 30 days
    # id: takes either a usgs or usbr id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_daily(self, id, usgs=False):
        reservoirs = self.utils.get_reservoirs(id, usgs)

        for reservoir in reservoirs:
            rdb = self.utils.get_current_year(reservoir['resId'])
            rdb_parsed = self.utils.compile_current_year(rdb, reservoir['resId'])

            self.client[os.environ['MONGO_DB']].reservoirs.update_one({'resId':reservoir['resId']}, {'$set':{'storage':rdb_parsed}})

    # refresh_reservoirs
    # fetch the most recent data for reservoirs
    # id: takes either a usgs or usbr id
    def refresh_reservoirs(self):
        reservoirs = self.utils.get_user_reservoirs()

        for reservoir in reservoirs:
            rdb = self.utils.get_current_day(reservoir['resId'])
            self.utils.compile_current_day(rdb, reservoir)
