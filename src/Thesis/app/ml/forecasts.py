# -*- coding: utf-8 -*-
"""
Created on Mon Oct 11 15:25:48 2021

@author: aceba
"""

from os import stat
import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn import metrics
import csv
from api_call import *
import json
# todo get data to database

df = pd.read_csv('sample_data.csv')

def get_stat_count():
    location_id = 1
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/forecasts/getstatcount/{location_id}", headers)

def predict_noinfec():
    df.to_csv(na_rep='Unknown')
    global reg 
    df['noinfec'] = df['noinfec'].fillna(df['noinfec'].interpolate(method ='linear', limit_direction='forward'))
    print(df['noinfec'])

    reg = linear_model.LinearRegression()
    print(df[['pop', 'novac', 'occup', 'location']])
    reg.fit(df[['pop', 'novac', 'occup', 'location']],df.noinfec)
    reg.coef_
    reg.intercept_
    global last_line
    print(df.iloc[-1:,:4].values)
    last_line = pd.DataFrame(df.iloc[-1:,:4].values)  
    return reg.predict(last_line)

predict_noinfec()

def percentage():
    # get last row/recent population
    population = pd.DataFrame(df.iloc[-1:,:1].values) 
    a = population
    b = reg.predict(last_line)
    percent = b / a * 100
    return percent

def main():    
    predict_noinfec_val = predict_noinfec()
    percentage_val = percentage()

    #print(predict_noinfec_val)
    print("value : {}".format(percentage_val))

    # save to db
    fc = {
        "predict_noinfec": percentage_val,
        "percentage": predict_noinfec_val,
    }
    response = api_post(f'http://192.168.254.101:4000/api/forecasts', fc)
    print(response)

#main()