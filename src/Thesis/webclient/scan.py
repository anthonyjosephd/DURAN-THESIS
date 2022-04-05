from users_sql import *
from logs_sql import *
from time import sleep
import time
import keyboard

# scan user rfid tag, validate user and insert to local db
def main():

    try:
        # start scanning and read tag
        while True:
            print("Hold a tag near the reader")
            if keyboard.read_key() == "q":
                # validate user from local db or central db (if connected online)
                rfid = "A12345678912111"
                locationid = "1"
                logtype = "1"
                # get user temperature
                #usertemp = read_temp().object_temp
                usertemp = "36.5"
                user = validate_local_user(rfid)
                if len(user) <= 0:
                    print("user not found!")
                else:
                    print("RFID:{}".format(user[0][1]))
                    print("Last Name:{}".format(user[0][2]))
                    # save log to local db
                    if insert_log(rfid, locationid, logtype, usertemp) == 1:
                        print("insert log successfully!")
                        list_logs("all")
                    else:
                        print("error insert log")
                    
            sleep(3)
                
    except Exception as e:
        print(f"An exception occurred: {e}")


if __name__ == '__main__':
    main()


