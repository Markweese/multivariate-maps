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
from station_utils import station_utils as utils

class station:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # today: todays date
    # date_compare: formats the date for comparison in populate_month
    # client: the mongodb client instance
    today = date.today()
    date_compare = "{}/{}".format(today.month, today.day + 1)
    params = [{'code': '00060', 'name': 'cfs'}, {'code': '00010', 'name': 'temp'}, {'code': '00095', 'name': 'conductance'}, {'code': '00400', 'name': 'ph'}]

    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        self.utils = utils(db_connect)
        print('init station_utils')

    # populate_month
    # backfill the cfs, ph, and temp arrays
    # station: station id to perform operations on
    def populate_month(self, station):
        url = 'https://waterdata.usgs.gov/nwis/dv?referred_module=sw&search_site_no={}&search_site_no_match_type=exact&site_tp_cd=ST&index_pmcode_00060=1&index_pmcode_00400=1&index_pmcode_00010=1&group_key=NONE&sitefile_output_format=html_table&column_name=agency_cd&column_name=site_no&column_name=station_nm&range_selection=days&period=30&format=rdb&date_format=YYYY-MM-DD&rdb_compression=value&list_of_search_criteria=search_site_no%2Csite_tp_cd%2Crealtime_parameter_selection'.format(station)
        rdb = self.utils.get_url(url)
        rdb_parsed = self.utils.parse_month(rdb, station)

        for key in rdb_parsed:
            try:
                self.client[os.environ['MONGO_DB']].stations.update(
                    {'stationNumber': station},
                    {'$set':
                        {key: rdb_parsed[key]}
                    }
                )
            except Exception as e:
                print(e)

    # populate_historic
    # Clear out historic array and populate with new data
    # station: station id to perform operations on
    def populate_historic(self, station):
        url = 'https://waterdata.usgs.gov/nwis/dv?referred_module=sw&search_site_no={}&search_site_no_match_type=exact&site_tp_cd=ST&index_pmcode_00060=1&group_key=NONE&sitefile_output_format=html_table&column_name=agency_cd&column_name=site_no&column_name=station_nm&range_selection=date_range&begin_date=1838-01-01&end_date={}&format=rdb&date_format=YYYY-MM-DD&rdb_compression=value&list_of_search_criteria=search_site_no%2Csite_tp_cd%2Crealtime_parameter_selection'.format(station, self.today)
        rdb = self.utils.get_url(url)
        rdb_parsed = self.utils.parse_historic(rdb)

        try:
            # push stats
            self.client[os.environ['MONGO_DB']].stations.update_one({'stationNumber': station}, {'$set': {'historicDaily': rdb_parsed}})

        except AssertionError as e:
            # Replace with logger for production
            print(e)

    # populate_day
    # Build the cfsInstantaneous array and push to mongo
    # station: station id to perform operations on
    def populate_day(self, station):
        url = 'https://waterdata.usgs.gov/nwis/uv?search_site_no={}&search_site_no_match_type=exact&index_pmcode_00060=1&group_key=NONE&sitefile_output_format=html_table&column_name=agency_cd&column_name=site_no&column_name=station_nm&range_selection=days&period=7&begin_date=2019-07-16&end_date={}&format=rdb&date_format=YYYY-MM-DD&rdb_compression=value&list_of_search_criteria=search_site_no%2Crealtime_parameter_selection'.format(station, self.today)
        rdb = self.utils.get_url(url)
        rdb_parsed = self.utils.parse_day(rdb)

        self.client[os.environ['MONGO_DB']].stations.update({'stationNumber': station},{'$set': {'cfsInstantaneous':rdb_parsed}})
        self.utils.update_cfs(station)

    # refresh_stations
    # get most recent reading for all user stations
    def refresh_stations(self):
        print('refresh stations start: {}'.format(datetime.now()))
        stations = self.utils.get_user_stations()

        for station in stations:
            print('populating: {}'.format(station))
            self.populate_day(station)

    # get_all_timezones
    # attach all station timezones
    def get_all_timezones(self):
        all_stations = list(self.client[os.environ['MONGO_DB']].stations.find({},{'_id':1, 'stationNumber': 1}))

        for station in all_stations:
            url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites={}&siteStatus=active'.format(station['stationNumber'])
            req = Request(url)

            with urlopen(req) as response:
                json_obj = json.loads(response.read())

                if len(json_obj['value']['timeSeries']) > 0:
                    self.client[os.environ['MONGO_DB']].stations.update({'stationNumber': station['stationNumber'] }, {'$set': {'timezone': json_obj['value']['timeSeries'][0]['sourceInfo']['timeZoneInfo']['defaultTimeZone']['zoneAbbreviation']}})

######################## Begin general GET routes for Node app ##########################
    # get_by_state
    # get and return all stations in a state
    def get_by_state(self, fip):
        # strip instantaneous, historic etc from object before sending back, supposedly will load faster
        stations = list(self.client[os.environ['MONGO_DB']].stations.find({'state': fip}, {'name': 1, 'stationNumber': 1, 'coordinates': 1, 'cfs': 1}))
        return stations

    # get_stations
    # get and return use stations by user id
    def get_stations(self, id):
        # paginate response by processing ?p= parameter, this should speed up pageload
        user = list(self.client[os.environ['MONGO_DB']].users.find({'_id': ObjectId(id)}))
        stations = list(self.client[os.environ['MONGO_DB']].stations.find({'stationNumber': {'$in': user[0]['stations']}}, {'name': 1, 'stationNumber': 1, 'coordinates': 1, 'cfs': 1, 'temp': 1}))

        return stations

    # get_station
    # get and return station by id
    def get_station(self, id):
        stations = list(self.client[os.environ['MONGO_DB']].stations.find({'stationNumber': id}, {'_id': 0, 'name': 1, 'stationNumber': 1, 'coordinates': 1, 'cfs': 1, 'temp': 1}))
        return stations

    def tag_reports(self):
        tagged_stations = list(self.client[os.environ['MONGO_DB']].stations.find({'gnisId': {'$exists': True}}))

        for station in tagged_stations:
            self.client[os.environ['MONGO_DB']].reports.update({'stationNumber': station['stationNumber'] }, { '$set': {'gnisId': station['gnisId']}}, multi=True);

        return 'updated'
