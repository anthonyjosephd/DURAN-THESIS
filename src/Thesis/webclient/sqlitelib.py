import sqlite3

# create sqlite connection
def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Exception as e:
        print(e)

    return conn

# create sqlite table
def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Exception as e:
        print(e)

# select data
def select_table(conn, create_query_sql):
    """ select data from table from the create_query_sql statement
    :param conn: Connection object
    :param create_query_sql: a SELECT TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        return c.execute(create_query_sql)
    except Exception as e:
        print(e)

# insert data
def insert_table(conn, create_insert_sql):
    """ select data from table from the create_insert_sql statement
    :param conn: Connection object
    :param create_insert_sql: a INSERT TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        res = c.execute(create_insert_sql)
        conn.commit()
        conn.close()
        return 1;
    except Exception as e:
        print(e)

# update data
def update_table(conn, create_update_sql):
    """ select data from table from the create_update_sql statement
    :param conn: Connection object
    :param create_update_sql: a UPDATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        res = c.execute(create_update_sql)
        conn.commit()
        conn.close()
        return 1;
    except Exception as e:
        print(e)
