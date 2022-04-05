from api_call import *
import json
from os import stat
import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn import metrics
import datetime

def main():
    # check if forcast must start with 1 record

    # train data
    response = train_new_data()
    if 200 == 200:
        print("inserted new data")
        # run forcast
        all_forcast = get_all_no_infec()
        print(all_forcast)
        if all_forcast.status_code == 200:
            print("has")
            no_infec_rate_data = all_forcast.content
        else:
            print("no last forcast")
            no_infec_rate_data = [{ "predict_noinfec": 80 }]

        # check has train data
        train_data = get_training_data()
        # check last training data
        last_train_data = get_last_training_data()

        if train_data.status_code == 200 and last_train_data.status_code == 200:
            # predict
            last_train_data_js = json.loads(last_train_data.content)
            last_train_data_json = {
              "population": last_train_data_js['population'],
              "novaccinated": last_train_data_js['novaccinated'],
              "nohighriskoccupation": last_train_data_js['nohighriskoccupation'],
              "locationid": last_train_data_js['locationid']
            }

            predict_data_val = predict_noinfec(no_infec_rate_data, train_data.content, last_train_data_json)
            last_percentage_resp = get_last_percentage()
            last_percentage_val = 0
            if last_percentage_resp.status_code == 200:
                last_percentage_val = json.loads(last_percentage_resp.content)['percentage']
            else:
                print("error getting last percentage")
            # save to forcasts
            # save to db
            fc = {
                "predict_noinfec": predict_data_val,
                "percentage": last_percentage_val,
                "dateforecasts": datetime.datetime.now()
            }
            response = save_to_forecast(fc)
            print(response)
        else:
            print("cannot predict no training data")
    else:
        print("error inserting training data")

def train_new_data():
    # execute only if records > 0
    stat_count = json.loads(get_stat_count().content)
    if stat_count[0]['pop'] > 0:
        #print(json.dumps(stat_count[0]))
        # insert
        train_data_json = {
            "population": stat_count[0]['pop'],
            "novaccinated": stat_count[0]['vac'],
            "nohighriskoccupation": stat_count[0]['occup'],
            "locationid": 1
        }
        return create_new_train_data(train_data_json)
         
    else:
        print("stat count zero")

def save_to_forecast(data):
    response = api_post(f'http://192.168.254.101:4000/api/forecasts', data)
    return response

def get_stat_count():
    location_id = 1
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/forecasts/getstatcount/{location_id}", headers)

def create_new_train_data(train_data):
    response = api_post(f'http://192.168.254.101:4000/api/train_data', train_data)
    return response

def get_all_no_infec():
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/forecasts/getallforcast", headers)

def get_training_data():
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/train_data", headers)

def get_last_training_data():
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/train_data/getlasttraindata", headers)

def get_last_percentage():
    headers = {}
    return api_get(f"http://192.168.254.101:4000/api/forecasts/getpercentage", headers)

def predict_noinfec(no_infec_data, train_data, last_train_data):
    train_data_json = json.loads(train_data)
    global reg 
    no_infec_json = json.loads(no_infec_data)
    no_infec_df = pd.json_normalize(no_infec_json)
    train_data_df = pd.json_normalize(train_data_json)
    last_train_data_df = pd.json_normalize(last_train_data)
    
    print(no_infec_df)
    reg = linear_model.LinearRegression()
    print(train_data_df[['population', 'novaccinated', 'nohighriskoccupation', 'locationid']])
    reg.fit(train_data_df[['population', 'novaccinated', 'nohighriskoccupation', 'locationid']],no_infec_df['predict_noinfec'])
    reg.coef_
    reg.intercept_
    global last_line
    last_line = pd.DataFrame(last_train_data_df.values)  
    return reg.predict(last_line)



main()