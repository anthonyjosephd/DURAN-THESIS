import sqlite3
#conn = sqlite3.connect('file:test.db?mode=ro', uri=True)
conn = sqlite3.connect('test.db')
cur = conn.cursor()

cur.execute('SELECT * FROM logs')

rows = cur.fetchall()

for r in rows:
    print(r)