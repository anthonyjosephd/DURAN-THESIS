from sqlitelib import *

# create sqlite database and tables
def main(): 
    database = r"/Users/josephanthonyduran/Desktop/Thesis/webclient/ltracer.db"

    # users table
    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users (
                                    id integer PRIMARY KEY,
                                    rfid text,
                                    lastname text NOT NULL,
                                    firstname text NOT NULL,
                                    contactno text,
                                    email text,
                                    age integer,
                                    gender integer,
                                    dateregistered text,
                                    status text NOT NULL
                                ); """

    # logs table
    sql_create_logs_table = """ CREATE TABLE IF NOT EXISTS logs (
                                    id text PRIMARY KEY,
                                    rfid text NOT NULL,
                                    locationid integer NOT NULL,
                                    date text NOT NULL,
                                    logtype integer NOT NULL,
                                    status integer NOT NULL,
                                    usertemp real NOT NULL
                                ); """

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create users table
        #create_table(conn, sql_create_users_table)
        
        insert_sql = ''' INSERT INTO users(id,rfid,lastname,firstname,contactno,email,age,gender,dateregistered,status)
              VALUES(9,"0003173061", "durann", "josh", "452115532", "kc22d@gmail.com", 24, 1, "2022-05-10 03:25:00", 0) '''

        insert_table(conn, insert_sql)

        # create logs tables
        #create_table(conn, sql_create_logs_table)
    else:
        print("Error! cannot create the database connection.")


if __name__ == '__main__':
    main()