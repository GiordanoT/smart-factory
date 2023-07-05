import time
import paho.mqtt.client as mqtt
from components.Database import Database
from info.Url import Url


def on_connect(client: mqtt.Client):
    client.subscribe('rooms/#')


def on_message(msg: mqtt.MQTTMessage):
    payload = msg.payload.decode("utf-8")
    topic = str(msg.topic)
    data = round(float(payload), 2)
    Database.write(topic, data)


def main():
    client = mqtt.Client('ID_MONITOR_1')
    client.on_connect = lambda client, userdata, flags, rc: on_connect(client)
    client.on_message = lambda client, userdata, msg: on_message(msg)
    connected = False
    while not connected:
        try:
            if client.connect(Url.mqtt) == 0:
                connected = True
        except:
            print('Connection failed')
            time.sleep(5)
    client.loop_forever()


if __name__ == '__main__':
    main()
