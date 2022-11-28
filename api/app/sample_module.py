# Dev only
import ssl
# Dev only

import os
import json
import math
from shapely.geometry import Polygon
import numpy as np
import pandas as pd
from io import StringIO
from bson.objectid import ObjectId
from datetime import date, datetime
from collections import defaultdict
from sample_utils import sample_utils as utils

class sample:
    # Dev only
    # if os.environ['ENVIRONMENT'] == 'develop':
        # ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only

    # Copy the data sets into a local dataframe that will persist for the entirety of the session
    df = pd.read_csv('app/data/zhvi_parsed.csv')
    df['date'] = pd.to_datetime(df['datemonth'])
    df = df.set_index(['date'])

    # Copy the region map data for the session
    metro_map = pd.read_csv('app/data/metro_map.csv')
    metro_map = metro_map.set_index(['RegionName'])

    # Init
    def __init__(self):
        # if db conn required - self.utils = utils(<db_connect>)
        # self.client = db_connect
        self.utils = utils()
        print('init sample_utils')

    # get_region_data
    # read region data from the CSV
    # params:
    #   - start_month: datemonth
    #   - end_month: datemonth
    #
    # returns {
    #    geoJson: {
    #    	"type" : "FeatureCollection",
    #    	"features" : [{
    #    		"type" : "Feature",
    #    		"properties" : {
    #              regionName: str
    #              zhvi: float ($)
    #              growth: float (%)
    #              usdGrowth: float ($)
    #    		},
    #    		"geometry" : {
    #    			"type" : "Point",
    #    			"coordinates" : [ lng: float, lat: float ]
    #    		}
    #    	}]
    #    },
    #   summaryData: [
    #    data: {
    #        regionName: str
    #        zhvi: float ($)
    #        growth: float (%)
    #        usdGrowth: float ($)
    #      },
    #      summaryStats: {
    #       -- for zhvi, growth, and usdGrowth
    #        p0: float,
    #        p10: float,
    #        p25: float,
    #        p50: float,
    #        p75: float,
    #        p90: float,
    #        p100: float,
    #      }
    #   ]
    # }
    def get_region_data(self, start_month = '2022-07-01', end_month = '2022-10-01'):
        # start_month = datetime.strptime(start_month, '%Y-%m-%d')
        # end_month = datetime.strptime(end_month, '%Y-%m-%d')
        # Only work on copies, use index for date scan
        df_copy = self.df.loc[start_month:end_month]

        # group by and aggregate the summary stats over the selected time range
        df_copy = df_copy.groupby('RegionName').agg({
            'growth': 'sum',
            'usd_growth': 'sum',
            'zhvi': 'mean'
        }).reset_index()

        # left join on metro_map
        df_copy = pd.merge(
            df_copy,
            self.metro_map,
            on='RegionName',
            how='left'
        )
        geoJson_object = {
        	'type' : 'FeatureCollection',
        	'features': list(map(self.map_features_to_geojson, df_copy.to_dict(orient='records')))
        }

        return {
            'geoJson': geoJson_object,
            'summaryData': {
                'data': df_copy.to_dict(orient='records'),
                'summaryStats': {
                    'zhivP0': df_copy['zhvi'].quantile(0),
                    'zhivP10': df_copy['zhvi'].quantile(.1),
                    'zhivP25': df_copy['zhvi'].quantile(.25),
                    'zhivP50': df_copy['zhvi'].quantile(.5),
                    'zhivP75': df_copy['zhvi'].quantile(.75),
                    'zhivP90': df_copy['zhvi'].quantile(.9),
                    'zhivP100': df_copy['zhvi'].quantile(1),
                    'growthP0': df_copy['growth'].quantile(0),
                    'growthP10': df_copy['growth'].quantile(.1),
                    'growthP25': df_copy['growth'].quantile(.25),
                    'growthP50': df_copy['growth'].quantile(.5),
                    'growthP75': df_copy['growth'].quantile(.75),
                    'growthP90': df_copy['growth'].quantile(.9),
                    'growthP100': df_copy['growth'].quantile(1),
                    'usdGrowthP0': df_copy['usd_growth'].quantile(0),
                    'usdGrowthP10': df_copy['usd_growth'].quantile(.1),
                    'usdGrowthP25': df_copy['usd_growth'].quantile(.25),
                    'usdGrowthP50': df_copy['usd_growth'].quantile(.5),
                    'usdGrowthP75': df_copy['usd_growth'].quantile(.75),
                    'usdGrowthP90': df_copy['usd_growth'].quantile(.9),
                    'usdGrowthP100': df_copy['usd_growth'].quantile(1),
                }
            }
        }

    def map_features_to_geojson(self, properties):
        return {
            'type' : 'Feature',
            'properties' : {
             'regionName': properties['RegionName'],
             'zhvi': properties['zhvi'],
             'growth': properties['growth'],
             'usdGrowth': properties['usd_growth']
            },
            'geometry' : {
                'type' : 'Point',
                'coordinates' : [ properties['lng'], properties['lat'] ]
            }
        }
