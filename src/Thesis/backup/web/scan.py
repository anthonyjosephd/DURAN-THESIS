from time import sleep
import sys
#from mfrc522 import SimpleMFRC522
#from main import *
import keyboard
#reader = SimpleMFRC522()

try:
    while True:
        print("Hold a tag near the reader")
        #id, text = reader.read()
        #location = "iloilo"
        #log_type = "in"
        
        if keyboard.read_key() == "q":  
            print('aaa')

        sleep(3)        
        # if id is not empty call main_func
        #if id not None:
        #    main_func(id, location, log_type)
        #else:
        #    print("rfid is empty")
        
        #print("ID: %s\nText: %s" % (id,text))

except KeyboardInterrupt:
    pass
    #GPIO.cleanup()
    #raise