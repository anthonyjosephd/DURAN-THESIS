from logs_sql import *
import datetime
from api_call import *

# to send log to queue, save to db
def send_log_main_queue():
    try:
        # get all pending logs from local db sqlite
        pending_logs = list_logs("pending")

        if len(pending_logs) > 0:
            for log in pending_logs:
                # send to queue
                create_queue_resp = send_to_queue(log)
                if (create_queue_resp.status_code == 200):
                    print(f'log sent to queue - http status: {create_queue_resp}')
                    # update log status eq to 1 in local db if send to queue successful
                    response = update_log(log)
                else:
                    print(f'unable to sent log to queue - http status: {create_queue_resp.status_code}')

        else:
            print("no pending logs to send!")

    except Exception as e:
        print(f"An exception occurred: {e}")


def send_to_queue(log):
    log = {
        "id": log[0],
        "rfid": log[1],
        "date": log[3],
        "locationid": log[2],
        "logtype": log[4],
        "usertemp": log[6],
    }
    return api_post(f'192.168.254.101:4000/api/queues', log)
        

def update_log(log):
    return update_log_status(log[0])

#if __name__ == '__main__':
#    main()