import os
import json
from flask import Flask, request, jsonify, render_template, redirect, url_for, send_from_directory
from dotenv import load_dotenv
import requests
import uuid
import curlify
import arrow
from flask_socketio import SocketIO


load_dotenv()
app = Flask(__name__, template_folder="dist",
            static_folder="dist", static_url_path="")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/v1/request-money', methods=['POST'])
def request_money():
    """Request Money Wrapper Function

    Takes the following body parameters:
        - amount {number}
        - contactName {string}
        - email {string}
        - memo {string, optional}
        - returnURL {string, optional}

    """
    data = request.data
    dataDict = json.loads(data)

    source_money_request_id = str(uuid.uuid4()).replace('-', '')
    response = requests.post(
        'https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send',
        headers={
            'accessToken': f"Bearer {os.getenv('ACCESS_TOKEN')}",
            'thirdPartyAccessId': os.getenv('THIRD_PARTY_ACCESS_ID'),
            'apiRegistrationId': os.getenv('API_REGISTRATION_ID'),
            'requestId': str(uuid.uuid4()),
            'deviceId': str(uuid.uuid4())
        },
        json={
            'sourceMoneyRequestId': source_money_request_id,
            'requestedFrom': {
                'contactName': dataDict['contactName'],
                'language': 'en',
                'notificationPreferences': [{
                    'handle': dataDict['email'],
                    'handleType': 'email',
                    'active': True
                }]
            },
            'amount': dataDict['amount'],
            'currency': 'CAD',
            'editableFulfillAmount': False,
            'requesterMessage': dataDict.get('memo', None),
            'expiryDate': arrow.utcnow().shift(hours=24).format('YYYY-MM-DDTHH:mm:ss') + '.835Z',
            'supressResponderNotifications': False
        })
    print(curlify.to_curl(response.request))

    return jsonify(json.loads(response.text)), response.status_code


@app.route('/v1/notifications', methods=['POST'])
def notifications():
    socketio.emit('notifications', {'data': request.data.decode("utf-8")})
    print(request.data)

    return ('', 202)


if __name__ == '__main__':
    socketio.run(app)
