from sqlitelib import *
from api_call import *
import json

database = r"/Users/josephanthonyduran/Desktop/Thesis/webclient/ltracer.db"

# validate user
def validate_local_user(rfid): 
    conn = create_connection(database)
    rfid_str = "'" + rfid + "'"

    if conn is not None: 
        cur = select_table(conn, "SELECT * from users WHERE rfid={}".format(rfid_str))
        #cur = select_table(conn, "SELECT * from users")
        rows = []
        if cur is not None:
            rows = cur.fetchall()
        
        #print(rows)
        return rows
    else:
        print("Error! cannot create the database connection.")

def insert_user(user):
    # validate
    if not user:
        print("user empty")
    else:
        print(user) 
    conn = create_connection(database)

    if conn is not None:
        id =   "'" + str(user['id']) + "'"
        rfid = "'" + user['rfid'] + "'"
        lastname = "'" + user['lastname'] + "'"
        firstname = "'" + user['firstname'] + "'"
        contactno = "'" + user['contactno'] + "'"
        email = "'" + user['email'] + "'"
        age = str(user['age'])
        gender = str(user['gender'])
        dateregistered = "'" + user['dateregistered'] + "'"
        status = "0"
        insert_sql = "INSERT INTO users(id,rfid,lastname,firstname,contactno,email,age,gender,dateregistered,status) VALUES ({},{},{},{},{},{},{},{},{},{})".format(id, rfid, lastname, firstname, contactno, email, age, gender, dateregistered, status)
        print(insert_sql)
        insert_table(conn, insert_sql)

    else:
        print("Error! cannot create the database connection.")


# sync users from central db
def sync_users_from_main_db():
    headers = { "content-type": "application/json" }
    return api_get(f'http://192.168.254.101:4000/api/users', headers)