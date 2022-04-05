from sqlitelib import *
import datetime
import time

database = r"/Users/josephanthonyduran/Desktop/Thesis/webclient/ltracer.db"

# insert into logs
def insert_log(rfid, locationid, logtype, usertemp):
    conn = create_connection(database)

    if conn is not None:
        dt = "'" + str(datetime.datetime.now()) + "'"
        location =   "'" + locationid + "'"
        logtype =   "'" + logtype + "'"
        rfid_str = "'" + rfid + "'"
        timestamp = datetime.datetime.timestamp(datetime.datetime.now())
        log_id = "'" + "{}-{}".format(str(rfid), str(timestamp)) + "'"
        user_temp = "'" + usertemp + "'"
        insert_sql = "INSERT INTO logs(id,rfid,locationid,date,logtype, status, usertemp) VALUES ({},{},{},{},{},{},{})".format(log_id, rfid_str, location, dt, logtype, 0, user_temp)

        return insert_table(conn, insert_sql)
    else:
        print("Error! cannot create the database connection.")

# list logs
def list_logs(status): 
    conn = create_connection(database)

    sql_query = "SELECT * from logs"
    if status == "pending": 
        sql_query = "SELECT * from logs WHERE status=0"
    elif status == "enqueued":
        sql_query = "SELECT * from logs WHERE status=1" 
    else:
        sql_query = "SELECT * from logs"

    if conn is not None: 
        cur = select_table(conn, sql_query)
        rows = []
        if cur is not None:
            rows = cur.fetchall()
        
        print(rows)
        return rows
    else:
        print("Error! cannot create the database connection.")

# update log status
def update_log_status(id):
    log_id = "'" + id + "'"
    conn = create_connection(database)

    if conn is not None:
        update_sql = "UPDATE logs SET status = 1 WHERE id = {}".format(log_id)      
        return update_table(conn, update_sql)
    else:
        print("Error! cannot create the database connection.")



list_logs("all")