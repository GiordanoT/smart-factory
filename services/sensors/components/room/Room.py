import datetime
import random
import string
from zoneinfo import ZoneInfo
from paho.mqtt.client import Client
from pytz import timezone


class Room:

    @staticmethod
    def default_value(field: str, room: str):
        if field != 'temperature' and field != 'air': return 0
        data = {'temperature': 0, 'air': 0}
        n = random.randint(1, 3)
        if n == 1: data = {'temperature': 0.63, 'air': 0.21}
        if n == 2: data = {'temperature': 1.63, 'air': 0.51}
        if n == 3: data = {'temperature': 1.03, 'air': 1.01}
        return data[field]

    @staticmethod
    def init(room: string, client: Client):
        actuators = ['alarm', 'locker', 'hot_conditioner', 'cool_conditioner', 'fan']
        for actuator in actuators:
            client.publish(f'rooms/{room}/actuators/{actuator}/data', 0, retain=True)
        client.publish(f'rooms/{room}/sensors/movement/data', 0, retain=True)
        client.publish(f'rooms/{room}/sensors/temperature/data', 15, retain=True)
        client.publish(f'rooms/{room}/sensors/air/data', 0, retain=True)

    @staticmethod
    def simulate(client: Client, room: str, temperature, air, hot_conditioner: float, cool_conditioner: float, fan: float):
        hour = datetime.datetime.now(tz=timezone('Europe/Rome')).hour
        if 8 <= hour <= 16:
            temperature += Room.default_value('temperature', room)
            locker = 0
        else:
            temperature -= Room.default_value('temperature', room)
            locker = 1
        air += Room.default_value('air', room)
        movement = random.randint(15, 95)
        if locker and random.random() < 0.8:
            movement = 0
        if hot_conditioner:
            temperature += Room.default_value('temperature', room) * 2.5
        if cool_conditioner:
            temperature -= Room.default_value('temperature', room) * 2.3
        if fan:
            air -= Room.default_value('air', room) * 1.5
        temperature = round(temperature, 2)
        air = round(air, 2)
        client.publish(f'rooms/{room}/sensors/movement/data', movement, retain=True)
        client.publish(f'rooms/{room}/sensors/temperature/data', temperature, retain=True)
        client.publish(f'rooms/{room}/sensors/air/data', air, retain=True)

        client.publish(f'rooms/{room}/actuators/locker/data', int(locker), retain=True)

