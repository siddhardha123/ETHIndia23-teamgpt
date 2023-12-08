import requests

client_secret = '$CROSSMINT_API_KEY'
project_id = '$CROSSMINT_PROJECT_ID'
url = 'https://staging.crossmint.com/api/2022-06-09/collections/default/nfts'
headers = {'x-client-secret': client_secret, 'x-project-id': project_id, 'Content-Type': 'application/json'}
data = {
  'metadata': {
    'name': 'Proof of Attendance',
    'image': 'https://www.example.com/assets/thanks_for_attending.png',
    'description': "Proof of Attendance to ETHIndia Contribution",
  },
  'recipient': 'email:gyaneshsamanta123@gmail.com:polygon',
}

response = requests.post(url, json=data, headers=headers)
print(response.json())

