import random
import paho.mqtt.client as mqtt
from flask import Flask, json, request
from flask_cors import CORS, cross_origin
import time
from info.Url import Url

app = Flask(__name__)
CORS(app)


@app.route('/executor', methods=['POST'])
@cross_origin(origin='*')
def index():

    client = mqtt.Client(f'ID_EXECUTOR_{random.randint(0, 99999)}')
    connected = False
    while not connected:
        try:
            if client.connect(Url.mqtt) == 0:
                connected = True
        except:
            print('Connection failed')
            time.sleep(5)

    data = request.json
    room = data['room']
    actuator = data['actuator']
    value = data['value']
    print(f'SETTING({room}): {actuator} -> {value}')
    client.publish(f'rooms/{room}/actuators/{actuator}/data', value, retain=True)
    client.disconnect()
    return json.dumps({})


app.run(debug=False, host=Url.executor, port=5002)
