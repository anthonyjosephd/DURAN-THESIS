from sqlitelib import *
from api_call import *
from users_sql import *
import json

database = r"/Users/josephanthonyduran/Desktop/Thesis/webclient/ltracer.db"

def main():
    users = json.loads(sync_users_from_main_db().content)
    #print(users)
    if not users:
        print("no users found in central db")
    else:
        for user in users:
            
            if not user['rfid']:
                print("rfid empty")
            else:
                user_check = validate_local_user(user['rfid'])
                if not user_check:
                    # create user
                    print("user: {} doesnt't exist".format(user['rfid']))
                    insert_user(user)
                else:
                    # update user
                    print("user: {} exist, update record".format(user['rfid']))

main()
