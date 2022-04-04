from users_sql import *
from logs_sql import *
from gpiozero import LED, Buzzer
from guizero import App, Box, Text, Picture, TextBox, warn
from smbus2 import SMBus
from mlx90614 import MLX90614
import json
import csv
from send_log import *

led8 = LED(19)


def read_temp():
    bus = SMBus(1)
    sensor = MLX90614(bus, address=0x5A)

    # results
    results = {
        "ambient_temp": sensor.get_ambient(),
        "object_temp": sensor.get_object_1()
    }

    # close bus
    bus.close()
    #return json.dumps(results)
    print(json.dumps(results))

def clearDisplay():
    print("Clear display")
    rfidStatus.value = "---"
    rfidText.value = ""
    led8.off()
    rfidStatus.repeat(500, checkRFidTag)

def checkRFidTag():
    bus = SMBus(1)
    sensor = MLX90614(bus, address=0x5A)
    body_temp = str(sensor.get_object_1())

    # results
    results = {
    
        "Body Temp": body_temp
    }

    # close bus
    bus.close()
    tagId = rfidText.value
    if tagId != "":
        RFidRegistered = False
        print(tagId)
        with open("Database.csv") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row["RFid"] == tagId:
                    RFidRegistered = True
                    picture = Picture(app, image="user3.png")
                    print("Welcome, " + row["User"] + json.dumps(results))
                    rfidStatus.value = "Welcome, " + row["User"] + "    " + json.dumps(results)
                    led8.on()
                    rfidStatus.after(9000, clearDisplay)

                    # validate and save log
                    print(json.dumps(results))
                    locationid = "1"
                    logtype = "1"
                    user = validate_local_user(tagId)
                    if len(user) <= 0:
                        print("user not found!")
                    else:
                        print("RFID:{}".format(user[0][1]))
                        print("Last Name:{}".format(user[0][2]))
                        # save log to local db
                        if insert_log(tagId, locationid, logtype, body_temp) == 1:
                            print("insert log successfully!")
                            list_logs("all")
                            send_log_main_queue()
                        else:
                            print("error insert log")
        
        if RFidRegistered == False:
            print("RFid tag is not registered")
            rfidStatus.value = "RFid tag is not registered"
            rfidStatus.after(500, clearDisplay)
        
        rfidStatus.cancel(checkRFidTag)

app = App(title="PROJECTAHON", width=600, height=600, layout="auto")

instructionText = Text(app, text="Place your wrist on the temperature scanner and")
instructionText = Text(app, text="Just Tap your RFID")
rfidText = TextBox(app, text="click here", height=60, width=60)
rfidStatus = Text(app, text="---")
rfidStatus.repeat(500, checkRFidTag)
picture = Picture(app, image="2tracer.png")
designBy = Text(app, text="ILOILO CITY", align="bottom")

app.display()
