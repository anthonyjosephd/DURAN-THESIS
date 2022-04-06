import requests

def api_get(url, headers):
    return requests.get(url, headers = headers)

def api_post(url, post_body):
    return requests.post(url, data = post_body)