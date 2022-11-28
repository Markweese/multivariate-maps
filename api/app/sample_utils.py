# Dev only
import ssl
# Dev only

import os
import csv
import json
import numpy as np
import pandas as pd
from io import StringIO
from pytz import timezone
from datetime import date, datetime
from collections import defaultdict

class sample_utils:
    # Dev only
    # if os.environ['ENVIRONMENT'] == 'develop':
        # ssl._create_default_https_context = ssl._create_unverified_context
    # Dev only


    # Init
    def __init__(self):
        # if db conn required
        # self.client = db_connect
        # self.populate_growth_col()
        print('init sample_utils')

    # Methods

    # populator function for formatted df
    # will prob just save this file as a static csv to avoid doing this at runtime
    def populate_zhvi_df(self):
        index = 0
        df = pd.read_csv('app/data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv')
        df_list = df.to_dict(orient='records')
        rows = df.shape[0]

        for row in df_list:
            index = index + 1
            print(index)
            print(rows)
            for col in row:
                # perform some validation to confirm that the field is a y/m
                if (self.validate_date(col)):
                    # parse nans to None value
                    if (math.isnan(row[col])):
                        val_to_add = None
                    else:
                        val_to_add = row[col]

                    # assemble the df row according to dtype specs
                    # {
                    #     'region': pd.Series(dtype='str'),
                    #     'datemonth': pd.Series(dtype='datemonth'),
                    #     'zhvi': pd.Series(dtype='float'),
                    # }
                    df_concat = pd.DataFrame(
                        [[val_to_add, row['RegionName'], col]],
                        columns=self.zhvi_cols
                    )
                    self.zhvi_df = pd.concat([self.zhvi_df, df_concat], sort=True)

        self.zhvi_df.to_csv('app/data/zhvi_parsed.csv')

    def validate_date(self, date_str):
        try:
            datetime.strptime(date_str, "%Y-%m-%d").strftime('%Y-%m-%d')
            return True
        except Exception as e:
            return False

    def map_metro_centroids(self):
        output = []
        # Writing to sample.json
        with open("app/data/metros.geojson", "r") as f:
            metros = json.load(f)
            for metro in metros['features']:
                # get centroid of polygon for mutivariate point mapping
                if (len(metro['geometry']['coordinates'][0]) < 3):
                    shp_poly = Polygon(metro['geometry']['coordinates'][0][0])
                else:
                    shp_poly = Polygon(metro['geometry']['coordinates'][0])

                # make z_id None so we can identify non-associated zillow metros and resolve unmapped metros
                output.append({
                    'name': metro['properties']['NAME'].encode('utf-8'),
                    'z_id': None,
                    'lat': shp_poly.centroid.y,
                    'lng': shp_poly.centroid.x
                })

        df = pd.DataFrame(output)
        df.to_csv('app/data/metro_map.csv', index=False, header=True)

    def map_metro_z_ids(self):
        metro_map = pd.read_csv('app/data/metro_map.csv')
        all_metros = pd.read_csv('app/data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv').to_dict(orient='records')

        for metro in all_metros:
            mapped_metro = metro_map.loc[metro_map['name'] == metro['RegionName']]

            if mapped_metro.empty:
                print(metro['RegionName'])

    def populate_growth_col(self):
        output = []
        df = pd.read_csv('app/data/zhvi_parsed.csv')
        df['date'] = pd.to_datetime(df['datemonth'])
        df_list = df.to_dict(orient='records')
        index = 0
        rows = df.shape[0]

        for row in df_list:
            print('{}/{}'.format(index,rows))
            index = index + 1
            current_month = datetime.strptime(row['datemonth'], '%Y-%m-%d')
            last_month = current_month - pd.DateOffset(months=1)
            last_month_row = df.loc[
                (
                    (df['date'].dt.month == last_month.month) &
                    (df['date'].dt.year == last_month.year)
                ) &
                (df['RegionName'] == row['RegionName'])
            ].to_dict(orient='records')

            if (len(last_month_row) == 0):
                row['growth'] = None
                row['usd_growth'] = None
            else:
                row['growth'] = 100 * ((row['zhvi'] - last_month_row[0]['zhvi']) / last_month_row[0]['zhvi'])
                row['usd_growth'] = row['zhvi'] - last_month_row[0]['zhvi']

            output.append(row)

        output_df = pd.DataFrame(output)
        # sort df
        output_df = output_df.sort_values(by=['RegionName', 'datemonth'], ascending=[True, True])
        # remove date field
        output_df = output_df.drop('date', axis=1)
        output_df.to_csv('app/data/sample_data.csv', index=False, header=True)
