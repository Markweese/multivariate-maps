# Dev only
import ssl
# Dev only

import os
import re
import csv
import calendar
import numpy as np
from io import StringIO
from pymongo import MongoClient
from datetime import date, datetime
from collections import defaultdict
from urllib.request import urlopen, Request

class snotel_utils:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    today = date.today()
    convert_month = { v:k for k,v in enumerate(calendar.month_abbr)}

    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        print('init snotel_utils')

    # Methods

    # parse_header
    # returns the index associated with desired columns
    # row: the header row
    def parse_header(self, row):
        headers = {}

        for i, cell in enumerate(row):
            try:
                if type(self.convert_month[cell]) == int:
                    headers[str(self.convert_month[cell])] = i
            except Exception as e:
                continue

        return headers

    # get_snowpacks
    # fetches snowpacks to be computed
    # id: the id provided to the api
    # usgs: boolean stating wether the provided id is for a usgs station
    def get_snowpacks(self, id, usgs):
        # If the passed id is for a usgs streamflow station, fetch affiliated snowpacks
        if usgs:
            huc = self.client[os.environ['MONGO_DB']].stations.find_one({ 'stationNumber': id }, { '_id':0, 'huc':1 })

            if huc is not None:
                snowpacks = list(self.client[os.environ['MONGO_DB']].snowpacks.find({ 'huc': huc['huc'] }, { '_id':0, 'stationNumber':1, 'state':1 }))
            else:
                snowpacks = []

        # Otherwise assume the passed id is a usbr id and continue
        else:
            snowpacks = list(self.client[os.environ['MONGO_DB']].snowpacks.find({ 'stationNumber': id }, { '_id':0, 'stationNumber':1, 'state':1 }))

        return snowpacks

    # get_user_snowpacks
    # fetches all tracked snowps
    def get_user_snowpacks(self):
        user_stations = list(self.client[os.environ['MONGO_DB']].users.find({},{'_id':0, 'stations':1}))
        user_stations_filtered = [station['stations'] for station in user_stations]
        user_stations_clean = list(set([station for stations in user_stations_filtered for station in stations]))
        all_stations = list(self.client[os.environ['MONGO_DB']].stations.find({ 'stationNumber':{ '$in': user_stations_clean }}, {'_id':0,'huc':1}))
        all_hucs = list({huc['huc'] for huc in all_stations})
        all_snowpacks = list(self.client[os.environ['MONGO_DB']].snowpacks.find({'huc':{ '$in': all_hucs}}, {'_id':0, 'stationNumber':1}))

        return all_snowpacks

    # aggregate_day
    # fetch the historic daily stats to bundle into the swe object
    # id: the id of the snowpack
    # date: the date for which we're grabbing stats ('%-m/%-d' format)
    # reading: the current reading we want to pack into the object
    def aggregate_day(self, id, date, reading):
        return self.client[os.environ['MONGO_DB']].snowpacks.aggregate([
            { '$match': {'stationNumber': id }},
            { '$unwind': '$historicDaily' },
            { '$match': {'historicDaily.day': date }},
            { '$project': {
              '_id': 0,
              'reading': reading,
              'date': date,
              'min': '$historicDaily.zero',
              'ten': '$historicDaily.ten',
              'twenty': '$historicDaily.twenty',
              'thirty': '$historicDaily.thirty',
              'fifty': '$historicDaily.fifty',
              'seventy': '$historicDaily.seventy',
              'eighty': '$historicDaily.eighty',
              'ninety': '$historicDaily.ninety',
              'max': '$historicDaily.hundred'
            }}
        ])

    # get_historic_swe
    # get historic swe readings
    # id: snowpack id
    # state: snowpack state
    def get_historic_swe(self, id, state):
        url = 'https://wcc.sc.egov.usda.gov/reportGenerator/view_csv/customMultiTimeSeriesGroupByStationReport/daily/start_of_period/{}:{}:SNTL%7Cid=%22%22%7Cname/POR_BEGIN,POR_END/WTEQ::value'.format(id, state)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            try:
                return res
            except Exception as e:
                # Replace with logger for production
                print(e)

    # compile_historic_swe
    # compile daily stats
    # data: snowpack csv dump
    # id: snowpack id
    def compile_historic_swe(self, data, id):
        # Set up output holders
        output_stats = {}
        stats_formatted = []
        swe_csv = StringIO(data)
        grouped_readings = defaultdict(list)
        swe_parsed = csv.reader(data, delimiter=',')

        for row in swe_csv:
            row = row.split(',')

            if re.search('^[1800-3000]', row[0]):
                date_object = datetime.strptime(row[0], '%Y-%m-%d')
                reading_key = '{}/{}'.format(date_object.month, date_object.day)

                try:
                    float(row[1])
                    row[1] = row[1].rstrip()
                    reading = float(row[1])
                    grouped_readings[reading_key].append(reading)
                except:
                    continue

        #Run stats and return them for every day.
        for key in grouped_readings:
            numpy_array = np.array(grouped_readings[key])
            stats_formatted.append({'day':key,
                                 'zero':np.percentile(numpy_array, 0),
                                 'ten':np.percentile(numpy_array, 10),
                                 'twenty':np.percentile(numpy_array, 20),
                                 'thirty':np.percentile(numpy_array, 30),
                                 'fourty':np.percentile(numpy_array, 40),
                                 'fifty':np.percentile(numpy_array, 50),
                                 'sixety':np.percentile(numpy_array, 60),
                                 'seventy':np.percentile(numpy_array, 70),
                                 'eighty':np.percentile(numpy_array, 80),
                                 'ninety':np.percentile(numpy_array, 90),
                                 'hundred':np.percentile(numpy_array, 100)
                                 })

        return(stats_formatted)

    # get_current_year
    # get daily readings
    # id: snowpack id
    # state: snowpack state
    def get_current_year(self, id, state):
        url = 'https://wcc.sc.egov.usda.gov/reportGenerator/view_csv/customMultiTimeSeriesGroupByStationReport/daily/start_of_period/{}:{}:SNTL%7Cid=%22%22%7Cname/-29,0/WTEQ::value?fitToScreen=false&sortBy=7%3A-1'.format(id, state)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            return res

    # compile_current_year
    # compile daily stats
    # data: snowpack csv dump
    # id: snowpack id
    def compile_current_year(self, data, id):
        reading_objects = []
        swe_csv = StringIO(data)
        swe_parsed = csv.reader(swe_csv, delimiter=',')

        for row in swe_parsed:
            if re.search('^[1800-3000]', row[0]):
                try:
                    float(row[1])
                    date_object = datetime.strptime(row[0], '%Y-%m-%d')
                    date = '{}/{}'.format(date_object.month, date_object.day)

                    swe_object = self.aggregate_day(id, date, row[1])

                    reading_objects += list(swe_object)

                except Exception as e:
                    print(e)

        return reading_objects

    # get_monthly
    # get monthly data from nrcs and get
    # id: snowpack id
    # state: snowpack state
    def get_monthly(self, id, state):
        url = 'https://wcc.sc.egov.usda.gov/reportGenerator/view_csv/customMultiTimeSeriesGroupByStationReport/monthly/start_of_period/{}:{}:SNTL%7Cid=%22%22%7Cname/-12,0/WTEQ::value?fitToScreen=false'.format(id, state)
        req = Request(url)

        with urlopen(req) as response:
            headers = {}
            data_holder = {}
            get_next = False
            res = response.read().decode('utf-8').splitlines()
            reading_rdb = csv.reader(res, delimiter=',')

            for row in reading_rdb:
                if get_next == True:
                    # check if there is a year listed
                    year = row[0].split(' ')[1]
                    month = str(self.convert_month[row[0].split(' ')[0]])

                    if month in data_holder:
                        if int(year) > int(data_holder[month]['year']):
                            data_holder[month] = {'reading': row[1], 'year': year}
                    else:
                        data_holder[month] = {'reading': row[1], 'year': year}

                if row[0] == 'Date':
                    get_next = True

            return data_holder

    # compile_monthly
    # compile monthly stats for a snowpack
    # data: the rdb from NWCC
    def compile_monthly(self, data, id):
        # Grouped historic stats holders
        output_stats = []
        grouped_historic = defaultdict(list)
        historic_daily = list(self.client[os.environ['MONGO_DB']].snowpacks.find({'stationNumber': id},{'_id':0, 'historicDaily':1}))

        try:
            # Group historic daily by month
            for day in historic_daily[0]['historicDaily']:
                month = day['day'].split('/')[0]

                grouped_historic[month].append({
                    'min': day['zero'],
                    'ten': day['ten'],
                    'twenty': day['twenty'],
                    'thirty': day['thirty'],
                    'fifty': day['fifty'],
                    'seventy': day['seventy'],
                    'eighty': day['eighty'],
                    'ninety': day['ninety'],
                    'max': day['hundred']
                })

            # Generate summary stats for each month
            for month in grouped_historic:
                if month in data:
                    local_output = {}

                    try:
                        float(data[month]['reading'])

                        for key in grouped_historic[month][0]:
                            local_output[key] = np.average(np.array([item[key] for item in grouped_historic[month]]))

                        local_output['month'] = month
                        local_output['year'] = data[month]['year']
                        local_output['reading'] = data[month]['reading']

                        output_stats.append(local_output)

                    except Exception as e:
                        print(e)

            return output_stats

        except Exception as e:
            print(e)

    # compile_month
    # compile single months average and package into an object
    # id: the snowpack id
    # month: the target month
    def compile_month(self, id, month):
        month_readings = []
        current_daily = list(self.client[os.environ['MONGO_DB']].snowpacks.find({'stationNumber': id['stationNumber']},{'_id':0, 'swe':1}))

        try:
            for day in current_daily[0]['swe']:
                current_month = day['date'].split('/')[0]

                if current_month == month:
                    month_readings.append(float(day['reading']))


            # Generate summary stats for the month
            month_average = np.average(month_readings)

            self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber': id['stationNumber'], 'sweMonthly.month': month},{'$set': {'sweMonthly.$.reading': month_average}})

        except Exception as e:
            print(e)

    # get_current_day
    # Fetch the most recent snotel readings
    # id: the snowpack id
    def get_current_day(self, id):
        url = 'https://wcc.sc.egov.usda.gov/reportGenerator/view_csv/customMultiTimeSeriesGroupByStationReport/daily/start_of_period/id="{}"%20AND%20outServiceDate="2100-01-01"%7Cname/0,0/WTEQ::value,SNWD::value?fitToScreen=false'.format(id)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            return res

    # compile_current_day
    # compile current daily and monthly reading
    def compile_current_day(self, data, id):
        get_next = False
        raw_csv = data.splitlines()
        parsed_csv = csv.reader(raw_csv, delimiter=',')

        for row in parsed_csv:
            if get_next:
                date = datetime.strptime(row[0], '%Y-%m-%d')
                date_clean = datetime.strftime(date, '%-m/%-d')
                check_station = list(self.client[os.environ['MONGO_DB']].snowpacks.find({'stationNumber':id['stationNumber'], 'swe.date':date_clean}))

                if len(check_station) > 0:
                    # if the date already exists, update it
                    self.compile_month(id, date_clean.split('/')[0])
                    self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber':id['stationNumber'], 'swe.date':date_clean}, {'$set':{'swe.$.reading':row[1]}})

                    break

                else:
                    # if not, remove the oldest object and add the new one
                    swe_object = list(self.aggregate_day(id['stationNumber'], date_clean, row[1]))
                    self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber':id['stationNumber']}, {'$push':{'swe': swe_object[0]}})
                    self.client[os.environ['MONGO_DB']].snowpacks.update_one({'stationNumber':id['stationNumber']}, {'$pop':{'swe': -1}})
                    self.compile_month(id, date_clean.split('/')[0])


            if len(row) > 0 and row[0] == 'Date':
                get_next = True
