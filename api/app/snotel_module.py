# Dev only
import ssl
# Dev only

import os
import csv
import numpy as np
from pymongo import MongoClient
from collections import defaultdict
from datetime import date, datetime
from urllib.request import urlopen, Request
from snotel_utils import snotel_utils as utils

class snotel:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        self.utils = utils(db_connect)
        print('init snotel_module')

    # Methods
    # populate_historic
    # compile historic data for a snowpack
    # id: takes either a usgs or snotel id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_historic(self, id, usgs=False):
        snowpacks = self.utils.get_snowpacks(id, usgs)

        for snowpack in snowpacks:
            swe = self.utils.get_historic_swe(snowpack['stationNumber'], snowpack['state'])
            swe_parsed = self.utils.compile_historic_swe(swe, snowpack['stationNumber'])

            self.client[os.environ['MONGO_DB']].snowpacks.update_one({ 'stationNumber': snowpack['stationNumber'] }, { '$set':{ 'historicDaily': swe_parsed }})

    # populate_year
    # compile monthly data for a snowpack
    # id: takes either a usgs or snotel id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_year(self, id, usgs=False):
        snowpacks = self.utils.get_snowpacks(id, usgs)

        for snowpack in snowpacks:
            swe_monthly = self.utils.get_monthly(snowpack['stationNumber'], snowpack['state'])
            swe_monthly_parsed = self.utils.compile_monthly(swe_monthly, snowpack['stationNumber'])

            self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber':snowpack['stationNumber']}, {'$set':{'sweMonthly':swe_monthly_parsed}})

    # populate_daily
    # compile daily stats for last 365 days
    # id: takes either a usgs or snotel id
    # usgs: specifies if the passed id should be treated as a usgs id
    def populate_daily(self, id, usgs=False):
        snowpacks = self.utils.get_snowpacks(id, usgs)

        for snowpack in snowpacks:
            swe = self.utils.get_current_year(snowpack['stationNumber'], snowpack['state'])
            swe_parsed = self.utils.compile_current_year(swe, snowpack['stationNumber'])

            self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber':snowpack['stationNumber']}, {'$set':{'swe':swe_parsed}})

    # refresh_snotel
    # fetch the most recent data for snotel
    def refresh_snotel(self):
        snowpacks = self.utils.get_user_snowpacks()

        for snowpack in snowpacks:
            rdb = self.utils.get_current_day(snowpack['stationNumber'])
            self.utils.compile_current_day(rdb, snowpack)
