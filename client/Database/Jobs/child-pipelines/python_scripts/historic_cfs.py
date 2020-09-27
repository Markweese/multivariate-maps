import sys
import os
import csv
import json
import numpy as np
from collections import defaultdict
from datetime import datetime

station ='%s_historic_cfs.csv' % (sys.argv[1])
directory = 'data/historic/cfs'
data = open('%s/%s' % (directory, station))

def get_stats(data, station):
    # Set up output holder and parse the tab delimited files
    output_stats = {}
    stats_formatted = []
    grouped_readings = defaultdict(list)
    parsed_rdb = csv.reader(data, delimiter='\t')

    for row in parsed_rdb:
        try:
            if row[0] == 'USGS':
                #generate key if date row contains a date string
                try:
                    date_object = datetime.strptime(row[2], "%Y-%m-%d")
                    reading_key = ("%s/%s" % (date_object.month, date_object.day))
                except:
                    continue

                #If cfs row contains int, add to the appropriate list, convert Ice values to 0
                try:
                    reading = int(row[3])
                    grouped_readings[reading_key].append(reading)
                except:
                    if "Ice" in row[3]:
                        grouped_readings[reading_key].append(0)
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
        stats_formatted.append(output_stats[key]);

    # output
    print(json.dumps(stats_formatted))

stats = get_stats(data, station)
