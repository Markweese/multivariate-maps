# Dev only
import ssl
# Dev only

import os
import csv
import json
import numpy as np
from io import StringIO
from pytz import timezone
from datetime import date, datetime
from collections import defaultdict
from urllib.request import urlopen, Request

class station_utils:
    # Dev only
    if os.environ['ENVIRONMENT'] == 'develop':
        ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only


    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        print('init station_utils')

    # Methods

    # get_user_stations
    # gets all stations being tracke dby users
    def get_user_stations(self):
        user_stations = list(self.client[os.environ['MONGO_DB']].users.find({},{'_id':0, 'stations':1}))
        user_stations_filtered = [station['stations'] for station in user_stations]
        user_stations_clean = list(set([station for stations in user_stations_filtered for station in stations]))

        return user_stations_clean

    # get_url
    # returns parsed rdb data from specified url
    # url: the url to fetch from
    def get_url(self, url):
        req = Request(url)
        with urlopen(req) as response:
            try:
                res = StringIO(response.read().decode('utf-8'))
                reading_rdb = csv.reader(res, delimiter='\t')

                return reading_rdb
            except Exception as e:
                print(e)

    # parse_header
    # parse the csv header for relevant columns
    # row: the row that the header lives on
    def parse_header(self, row):
        cfs = None
        temp = None
        ph = None

        try:
            for i, cell in enumerate(row):
                if cell.split('_')[0].isdigit():
                    meta_data = cell.split('_')

                    if meta_data[2] == '00003' and len(meta_data) == 3:
                        if meta_data[1] == '00060':
                            cfs = i
                        if meta_data[1] == '00010':
                            temp = i

                    elif meta_data[2] == '00001' and meta_data[1] == '00400':
                        if len(meta_data) == 3:
                            ph = i

            return {'cfs': cfs, 'temp': temp, 'ph': ph}
        except Exception as e:
            # Replace with logger for production
            print(e)

    # parse_historic
    # parse the tab delimited USGS response into dict
    # data: raw rdb to perform operations on
    def parse_historic(self, data):
        output_stats = {}
        stats_formatted = []
        grouped_readings = defaultdict(list)

        for row in data:
            try:
                if row[0] == 'USGS':
                    #generate key if date row contains a date string
                    try:
                        date_object = datetime.strptime(row[2], '%Y-%m-%d')
                        reading_key = '{}/{}'.format(date_object.month, date_object.day)
                    except:
                        continue

                    #If cfs row contains int, add to the appropriate list, convert Ice values to 0
                    try:
                        reading = float(row[3])
                        grouped_readings[reading_key].append(reading)
                    except:
                        if 'Ice' in row[3]:
                            continue
                        else:
                            continue
            except:
                continue

        #Run stats and return them for every day.
        for key in grouped_readings:
            numpy_array = np.array(grouped_readings[key])
            output_stats[key] = {'day':key,
                                 'zero': np.percentile(numpy_array, 0),
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
                                 }

        for key in output_stats:
            stats_formatted.append(output_stats[key])

        # output
        return stats_formatted

    # parse_day
    # parses instantaneous data into mongo object
    # data: the parsed rdb file
    def parse_day(self, data):
        output = []

        for row in data:
            if len(row) > 1 and row[0] == 'USGS':
                timezone_map = {'PST': 'US/Pacific', 'CST': 'US/Central', 'EST': 'EST', 'MST': 'MST', 'AKST': 'US/Alaska'}
                today = datetime.now(timezone(timezone_map[row[3]]))
                date_compare = '{}/{}'.format(today.month, today.day)
                date_object = datetime.strptime(row[2], '%Y-%m-%d %H:%M')
                date_string = ('{}/{}'.format(date_object.month, date_object.day))
                time = date_object.strftime('%I:%M %p')

                if date_string == date_compare:
                    try:
                        output.append({
                                        'reading': float(row[4]),
                                        'date': date_string,
                                        'time': time
                                        })

                    except Exception as e:
                        output.append({
                                        'reading': -1,
                                        'errorCode': row[4],
                                        'date': date_string,
                                        'time': time
                                        })

        return output

    # parse_month
    # parses object for ph, cfs, and temp arrays
    # data: the parsed rdb file
    # id: station id
    def parse_month(self, data, id):
        output = {'cfs':[], 'temp':[], 'ph':[]}

        for row in data:
            try:
                if row[0] == 'agency_cd':
                    headers = self.parse_header(row)
                if row[0] == 'USGS':
                    date_object = datetime.strptime(row[2], '%Y-%m-%d')
                    date = '{}/{}'.format(date_object.month, date_object.day)
                if row[0] == 'USGS' and not headers['cfs'] == None:
                    historic = self.client[os.environ['MONGO_DB']].stations.find_one({'stationNumber': id}, {'_id':0, 'historicDaily':{'$elemMatch':{'day': date}}})

                    try:
                        output['cfs'].append({
                                     'reading': float(row[headers['cfs']]),
                                     'errorCode': None,
                                     'date': date,
                                      'min': historic['historicDaily'][0]['zero'] ,
                                      'ten': historic['historicDaily'][0]['ten'] ,
                                      'twenty': historic['historicDaily'][0]['twenty'] ,
                                      'thirty': historic['historicDaily'][0]['thirty'] ,
                                      'fifty': historic['historicDaily'][0]['fifty'] ,
                                      'seventy': historic['historicDaily'][0]['seventy'] ,
                                      'eighty': historic['historicDaily'][0]['eighty'] ,
                                      'ninety': historic['historicDaily'][0]['ninety'] ,
                                      'max': historic['historicDaily'][0]['hundred']
                                     })
                    except:
                        output['cfs'].append({
                                     'reading': -1,
                                     'errorCode': row[headers['cfs']],
                                     'date': date,
                                      'min': historic['historicDaily'][0]['zero'] ,
                                      'ten': historic['historicDaily'][0]['ten'] ,
                                      'twenty': historic['historicDaily'][0]['twenty'] ,
                                      'thirty': historic['historicDaily'][0]['thirty'] ,
                                      'fifty': historic['historicDaily'][0]['fifty'] ,
                                      'seventy': historic['historicDaily'][0]['seventy'] ,
                                      'eighty': historic['historicDaily'][0]['eighty'] ,
                                      'ninety': historic['historicDaily'][0]['ninety'] ,
                                      'max': historic['historicDaily'][0]['hundred']
                                     })
                if row[0] == 'USGS' and not headers['temp'] == None:
                    output['temp'].append({'reading': row[headers['temp']], 'date': date})
                if row[0] == 'USGS' and not headers['ph'] == None:
                    output['ph'].append({'reading': row[headers['ph']], 'date': date})
            except Exception as e:
                # Replace with logger for production
                print(e)

        return output

    # get_current_readings
    # gets instantaneous values for temp cfs and ph
    # id: station id
    def get_current_readings(self, id):
        url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites={}&siteStatus=active'.format(id)
        req = Request(url)

        with urlopen(req) as response:
            return json.loads(response.read())

    # update_cfs
    # update an object in the cfs object to take the most recent value
    # data: and object containing the day and reading
    # id: the station id
    def update_cfs(self, id):
        cfs_instantaneous = self.client[os.environ['MONGO_DB']].stations.find_one({'stationNumber':id}, {'_id':0, 'cfsInstantaneous':1})

        if cfs_instantaneous is not None and 'cfsInstantaneous' in cfs_instantaneous:
            if len(cfs_instantaneous['cfsInstantaneous']) > 0:
                cfs_instantaneous_date = cfs_instantaneous['cfsInstantaneous'][0]['date']
                cfs_instantaneous_clean = [item['reading'] for item in cfs_instantaneous['cfsInstantaneous'] if isinstance(item['reading'], float)]
                cfs_object = self.client[os.environ['MONGO_DB']].stations.find_one({'stationNumber':id}, {'_id':0, 'cfs':{'$elemMatch':{'date': cfs_instantaneous_date}}})

                if len(cfs_instantaneous_clean) > 0:
                    cfs_instantaneous_error_code = None
                    cfs_instantaneous_mean = np.mean([item['reading'] for item in cfs_instantaneous['cfsInstantaneous'] if isinstance(item['reading'], float)])
                else:
                    cfs_instantaneous_mean = -1
                    cfs_instantaneous_error_code = cfs_instantaneous['cfsInstantaneous'][0]['errorCode']

                if 'cfs' in cfs_object and len(cfs_object['cfs']) > 0:
                    self.client[os.environ['MONGO_DB']].stations.update_one({'stationNumber':id, 'cfs.date':cfs_instantaneous_date}, {'$set':{'cfs.$.reading': cfs_instantaneous_mean, 'cfs.$.errorCode': cfs_instantaneous_error_code}})
                else:
                    historic = self.client[os.environ['MONGO_DB']].stations.find_one({'stationNumber': id}, {'_id':0, 'historicDaily':{'$elemMatch':{'day': cfs_instantaneous_date}}})

                    if 'historicDaily' in historic and len(historic['historicDaily']) > 0:
                        # Add new daily object to cfs
                        self.client[os.environ['MONGO_DB']].stations.update_one({'stationNumber':id}, {'$push': {'cfs':{
                            'reading': cfs_instantaneous_mean,
                            'errorCode': cfs_instantaneous_error_code,
                            'date': cfs_instantaneous_date,
                            'min': historic['historicDaily'][0]['zero'],
                            'ten': historic['historicDaily'][0]['ten'],
                            'twenty': historic['historicDaily'][0]['twenty'],
                            'thirty': historic['historicDaily'][0]['thirty'],
                            'fifty': historic['historicDaily'][0]['fifty'],
                            'seventy': historic['historicDaily'][0]['seventy'],
                            'eighty': historic['historicDaily'][0]['eighty'],
                            'ninety': historic['historicDaily'][0]['ninety'],
                            'max': historic['historicDaily'][0]['hundred']
                        }}})
                        # Pop the oldest object off the set
                        self.client[os.environ['MONGO_DB']].stations.update_one({'stationNumber':id}, {'$pop':{'cfs':-1}})
