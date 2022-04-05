from api_call import *

headers = {'apikey': 'qwewerewtrwe11231254aaa'}
response = api_get("http://192.168.1.105:8000/api/users", headers)
print(response.json())