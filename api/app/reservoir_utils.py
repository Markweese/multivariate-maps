# Dev only
import ssl
# Dev only

import os
import csv
import numpy as np
from io import StringIO
from pymongo import MongoClient
from datetime import date, datetime, timedelta
from collections import defaultdict
from urllib.request import urlopen, Request

class reservoir_utils:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    today = date.today()
    yesterday = datetime.strftime(datetime.now() - timedelta(1), '%Y-%m-%d')

    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        print('init reservoir_utils')

    # Methods

    ## populate_historic utils ##

    # get_reservoirs
    # fetches reservoirs to be computed
    # id: the id provided to the api
    # usgs: boolean stating wether the provided id is for a usgs station
    def get_reservoirs(self, id, usgs):
        # If the passed id is for a usgs streamflow station, fetch affiliated reservoirs
        if usgs:
            huc = self.client[os.environ['MONGO_DB']].stations.find_one({ 'stationNumber': id }, { '_id':0, 'huc':1 })

            if huc is not None:
                reservoirs = list(self.client[os.environ['MONGO_DB']].reservoirs.find({ 'huc': huc['huc'] }, { '_id':0, 'resId':1 }))
            else:
                reservoirs = []

        # Otherwise assume the passed id is a usbr id and continue
        else:
            reservoirs = list(self.client[os.environ['MONGO_DB']].reservoirs.find({ 'resId': id }, { '_id':0, 'resId':1 }))

        return reservoirs

    # get_user_reservoirs
    # fetches all tracked reservoirs
    def get_user_reservoirs(self):
        user_stations = list(self.client[os.environ['MONGO_DB']].users.find({},{'_id':0, 'stations':1}))
        user_stations_filtered = [station['stations'] for station in user_stations]
        user_stations_clean = list(set([station for stations in user_stations_filtered for station in stations]))
        all_stations = list(self.client[os.environ['MONGO_DB']].stations.find({ 'stationNumber':{ '$in': user_stations_clean }}, {'_id':0,'huc':1}))
        all_hucs = list({huc['huc'] for huc in all_stations})
        all_reservoirs = list(self.client[os.environ['MONGO_DB']].reservoirs.find({'huc':{ '$in': all_hucs}}, {'_id':0, 'resId':1}))

        return all_reservoirs

    # get_historic_rdb
    # fetches the historic rdb from usbr servers
    # id: id of the desired reservoir
    def get_historic_rdb(self, id):
        url = 'https://water.usbr.gov/api/web/app.php/api/series?sites={}&parameters=Day.Inst.ReservoirStorage.af&start=1850-01-01&end={}&format=csv'.format(id, self.today)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            try:
                return res
            except Exception as e:
                # Replace with logger for production
                print(e)

    # compile_historic_rdb
    # compile the tab delimited USGS response into dict
    # data: raw rdb to perform operations on
    def compile_historic_rdb(self, data):
        output_stats = {}
        rdb = StringIO(data)
        stats_formatted = []
        grouped_readings = defaultdict(list)
        parsed_rdb = csv.reader(rdb, delimiter=',')

        for i, row in enumerate(parsed_rdb):
            if i > 4:
                try:
                    if len(row) > 1:
                        clean_date = row[3].replace("'", "")
                        date_object = datetime.strptime(clean_date, '%Y-%m-%d %H:%M:%S')
                        reading_key = '{}/{}'.format(date_object.month, date_object.day)
                except Exception as e:
                    print(e)
                    continue

                try:
                    if len(row) > 1:
                        reading = float(row[4].replace("'","").replace(' ',''))
                        grouped_readings[reading_key].append(reading)
                except Exception as e:
                    print(e)
                    continue

        # Compile stats object for every day.
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

        return stats_formatted


    ## populate_year utils ##

    # get_monthly
    # summarizes monthly averages and packages them in an object
    # id: the reservoir id
    def get_monthly(self, id):
        one_year = self.today - timedelta(days=365)
        url = 'https://water.usbr.gov/api/web/app.php/api/series?sites={}&parameters=Day.Inst.ReservoirStorage.af&start={}&end={}&format=csv'.format(id['resId'], one_year, self.today)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            return res

    # compile_monthly
    # summarizes monthly averages and packages them in an object
    # id: the reservoir id
    def compile_monthly(self, data, id):
        get_next = False
        output_holder = {}
        rdb = StringIO(data)
        grouped_readings = {}
        parsed_rdb = csv.reader(rdb, delimiter=',')

        for row in parsed_rdb:
            if len(row) > 0:
                if get_next == True:
                    year = int(row[3].split('-')[0])
                    month = str(row[3].split('-')[1]).lstrip('0')

                    if not month in grouped_readings:
                        grouped_readings[month] = {'readings':[]}

                    if 'year' in grouped_readings[month]:
                        if year > grouped_readings[month]['year']:
                            grouped_readings[month]['year'] = year
                    else:
                        grouped_readings[month]['year'] = year

                    grouped_readings[month]['readings'].append(float(row[4]))

                if row[0] == 'Site':
                    get_next = True

        for key in grouped_readings:
            numpy_array = np.array(grouped_readings[key]['readings'])

            if not key in output_holder:
                output_holder[key] = {'year':grouped_readings[key]['year'], 'reading':None}

            output_holder[key]['reading'] = np.mean(numpy_array)

        return output_holder


    # compile_month
    # compile single months average and package into an object
    # id: the reservoir id
    # month: the target month
    def compile_month(self, id, month):
        month_readings = []
        current_daily = list(self.client[os.environ['MONGO_DB']].reservoirs.find({'resId': id['resId']},{'_id':0, 'storage':1}))

        try:
            for day in current_daily[0]['storage']:
                current_month = day['date'].split('/')[0]

                if current_month == month:
                    month_readings.append(float(day['reading']))


            # Generate summary stats for the month
            month_average = np.average(month_readings)

            self.client[os.environ['MONGO_DB']].reservoirs.update_one({'resId': id['resId'], 'storageMonthly.month': month},{'$set': {'storageMonthly.$.reading': month_average}})

        except Exception as e:
            print(e)

    # get_monthly_historic
    # Fetch historic data from db and compile summary stats
    # data: the compiled stats object from compile_monthly
    # id: the reservoir id
    def get_monthly_historic(self, data, id):
        # Grouped historic stats holders
        output_stats = []
        grouped_historic = defaultdict(list)
        historic_daily = list(self.client[os.environ['MONGO_DB']].reservoirs.find({'resId': id['resId']},{'_id':0, 'historicDaily':1}))

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

                    for key in grouped_historic[month][0]:
                        local_output[key] = np.average(np.array([item[key] for item in grouped_historic[month]]))

                    local_output['month'] = month
                    local_output['year'] = str(data[month]['year'])
                    local_output['reading'] = data[month]['reading']

                    output_stats.append(local_output)

            output_stats.sort(key=lambda i: int(i['month']))

            return output_stats

        except Exception as e:
            print(e)


    ## populate_daily utils ##

    # get_current_year
    # Get the rdb for the last month of readings
    # id: the reservoir id
    def get_current_year(self, id):
        one_month = self.today - timedelta(days=30)
        url = 'https://water.usbr.gov/api/web/app.php/api/series?sites={}&parameters=Day.Inst.ReservoirStorage.af&start={}&end={}&format=csv'.format(id, one_month, self.today)
        req = Request(url)

        with urlopen(req) as response:
            res = response.read().decode('utf-8')

            return res

    # compile_current_year
    # Fetch historic data from db and compile summary stats
    # data: the csv dump from get_current_year
    # id: the reservoir id
    def compile_current_year(self, data, id):
        reading_objects = []
        raw_csv = data.splitlines()
        parsed_csv = csv.reader(raw_csv, delimiter=',')

        for row in parsed_csv:
            try:
                # Avoid index out of range
                if len(row) >= 4:
                    # Try to float the number, continue if not float
                    try:
                        float(row[4])

                        date_object = datetime.strptime(row[3], '%Y-%m-%d %H:%M:%S')
                        date = ('{}/{}'.format(date_object.month, date_object.day))

                        storage_object = self.client[os.environ['MONGO_DB']].reservoirs.aggregate([
                            { '$match': {'resId': id }},
                            { '$unwind': '$historicDaily' },
                            { '$match': {'historicDaily.day': date }},
                            { '$project': {
                              '_id': 0,
                              'date': date,
                              'reading': row[4],
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

                        reading_objects += list(storage_object)

                    except Exception as e:
                        print(e)

            except:
                continue

        reading_objects.sort(key=lambda i: datetime.strptime(i['date'], "%m/%d"))

        return reading_objects

    # get_current_day
    # Fetch the most recent storage readings
    # id: the reservoir id
    def get_current_day(self, id):
        url = 'https://water.usbr.gov/api/web/app.php/api/series?sites={}&parameters=Day.Inst.ReservoirStorage.af&start={}&end={}&format=csv'.format(id, self.yesterday, self.today)
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
                date = datetime.strptime(row[3], '%Y-%m-%d %H:%M:%S')
                date_clean = datetime.strftime(date, '%-m/%-d')

                self.compile_month(id, date_clean.split('/')[0])
                self.client[os.environ['MONGO_DB']].reservoirs.update_one({'resId':id['resId'], 'storage.date':date_clean}, {'$set':{'storage.$.reading':row[4]}})
                break

            if len(row) > 0 and row[0] == 'Site':
                get_next = True
