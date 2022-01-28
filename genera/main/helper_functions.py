import json
import requests

def nft_storage_api_store(file):
    url = 'https://api.nft.storage/upload'
    headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyRWJFRjZiRTA1MzA5RDJmOEEzRjkwZUFkMjMxOEIwNDAwODY2MDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjM3Njc0MzYwOSwibmFtZSI6ImdlbmVyYSJ9.yyDAb5udpZzrLmJc1qf4iUt0mxPhkqH0k6RYTp-V7Z4',
                        "Content-Type": "application/car"
    }
    try:
        response = requests.post(url, data = file, headers=headers)
        base_uri = json.loads(response.content)
    except requests.exceptions.HTTPError as e:
        print(e.response.text)
        return False
    return base_uri