import datetime
import os


class Analyzer:

    def __init__(self):
        self.symptoms = {}
        self.data = {}
        self.room = ''

    def set_room(self, room):
        self.room = room
        self.symptoms[room] = {}

    def set_data(self, data):
        self.data = data

    def check_movement(self):
        data = self.data
        room = self.room
        locker = data['locker']
        movement = data['movement']
        if locker == 1 and movement >= float(os.getenv('MAX_MOVEMENT')):
            print(f'WARNING({room}): Alarm should be activate!!')
            self.symptoms[room]['movement'] = {'code': -1}

    def check_temperature(self):
        data = self.data
        room = self.room
        hot_conditioner = data['hot_conditioner']
        cool_conditioner = data['cool_conditioner']
        temperature = data['temperature']
        if temperature >= float(os.getenv('MAX_TEMPERATURE')) and not cool_conditioner:
            print(f'WARNING({room}): Cool conditioner should be activate!!')
            self.symptoms[room]['temperature'] = {'code': -1}

        if temperature <= float(os.getenv('MIN_TEMPERATURE')) and not hot_conditioner:
            print(f'WARNING({room}): Hot conditioner should be activate!!')
            self.symptoms[room]['temperature'] = {'code': 1}

        if float(os.getenv('MIN_TEMPERATURE')) + 5 <= temperature <= float(os.getenv('MAX_TEMPERATURE')) - 5:
            print(f'INFO({room}): Temperature measurement is okay!!')
            self.symptoms[room]['temperature'] = {'code': 0}

    def check_air(self):
        data = self.data
        room = self.room
        fan = data['fan']
        air = data['air']
        if air >= float(os.getenv('MAX_AIR')) and not fan:
            print(f'WARNING({room}): Fan should be activate!!')
            self.symptoms[room]['air'] = {'code': -1}

        if air <= float(os.getenv('MAX_AIR')) - (float(os.getenv('MAX_AIR')) // 2):
            print(f'INFO({room}): Air measurement is okay!!')
            self.symptoms[room]['air'] = {'code': 0}
