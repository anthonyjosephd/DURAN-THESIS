import datetime
import time
import sqlite3
conn = sqlite3.connect('test.db')

cur = conn.cursor()

# Create table
#cur.execute('''CREATE TABLE logs
#               (log_id text, rfid text, date_log datetime, location text, log_type text)''')

# Insert a row of data
for x in range(1, 10000):
    dt = "'" + str(datetime.datetime.now()) + "'"
    insert_sql = "INSERT INTO logs VALUES ({},{},{},{},{})".format("'1-13132534adasd31321-210531-051552'","'13132534adasd31321'", dt ,"'wvsu iloilo'", "'in'")
    print(insert_sql)
    cur.execute(insert_sql)
    #time.sleep(1)
    # Save (commit) the changes
    conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()