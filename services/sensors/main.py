import time
import paho.mqtt.client as mqtt
from components.room.Room import Room
from info.Url import Url

DATA_SIMULATION_RATE = 15
ROOMS = ['A', 'B', 'C']

DATA = {}
for room in ROOMS:
    DATA[room] = {
        'alarm': 0.0,
        'locker': 0.0,
        'hot_conditioner': 0.0,
        'cool_conditioner': 0.0,
        'fan': 0.0,
        'movement': 0.0,
        'temperature': 15.0,
        'air': 0.0
    }


def on_connect(client: mqtt.Client):
    client.subscribe(f'rooms/#')


def on_subscribe(msg: mqtt.MQTTMessage):
    payload = msg.payload.decode("utf-8")
    value = round(float(payload), 2)

    topic = str(msg.topic)
    topic = topic.split("/")
    room = topic[1]
    device = topic[3]

    DATA[room][device] = value


def generate_data():
    client_publish = mqtt.Client('ID_SENSORS_1')
    client_publish.on_publish = lambda client, userdata, mid: print("PUBLISH: ", mid)

    client_subscribe = mqtt.Client('ID_SENSORS_2')
    client_subscribe.on_connect = lambda client, userdata, flags, rc: on_connect(client)
    client_subscribe.on_message = lambda client, userdata, msg: on_subscribe(msg)

    connected = False
    while not connected:
        try:
            if client_publish.connect(Url.mqtt) == 0 and client_subscribe.connect(Url.mqtt) == 0:
                connected = True
        except:
            print('Connection failed')
            time.sleep(5)

    for room in ROOMS:
        Room.init(room, client_publish)

    while True:
        for room in ROOMS:
            device = DATA[room]

            # Effectors
            alarm = device['alarm']
            locker = device['locker']
            hot_conditioner = device['hot_conditioner']
            cool_conditioner = device['cool_conditioner']
            fan = device['fan']

            # Sensors
            movement = device['movement']
            temperature = device['temperature']
            air = device['air']

            client_subscribe.loop_start()
            Room.simulate(client_publish, room, temperature, air, hot_conditioner, cool_conditioner, fan)
            client_subscribe.loop_stop()

        time.sleep(DATA_SIMULATION_RATE)


if __name__ == '__main__':
    generate_data()
