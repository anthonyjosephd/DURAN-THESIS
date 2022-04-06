import datetime
from api_call import *

#rfid, location, log_type
def main_func():
    
    try:
        # Scan rfid
        rfid = '13132534adasd31321'
        location = 'wvsu_main'
        log_type = 'out'
        headers = {'content-type': 'application/json'}
        # validate user by rfid
        find_user_resp = api_get(f'http://localhost:4000/api/users/{rfid}' , headers)
        if (find_user_resp.status_code == 200):
            print(f'user response: {find_user_resp.text}')
            # log user to queue
            log = {
                "rfid": rfid,
                "date_log": datetime.datetime.now(),
                "location": location,
                "log_type": log_type
            }
            # send log to queue
            create_queue_resp = api_post(f'http://localhost:4000/api/queues', log)
            if (create_queue_resp.status_code == 200):
                print(f'log sent to queue - http status: {create_queue_resp}')
            else:
                print(f'unable to sent log to queue - http status: {create_queue_resp.status_code}')

        else:
            print(f'validate user response code: {find_user_resp.status_code}')

    except Exception as e:
        print(f"An exception occurred: {e}")

main_func()