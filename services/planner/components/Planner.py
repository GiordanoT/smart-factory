import time
import requests
from info.Url import Url


class Planner:
    def __init__(self, symptoms):
        self.symptoms = symptoms

    def execute(self):
        symptoms = self.symptoms
        for room in symptoms:
            symptom = symptoms[room]
            for sensor in symptom:
                if sensor == 'movement': Planner.movement(symptom[sensor], room)
                if sensor == 'temperature': Planner.temperature(symptom[sensor], room)
                if sensor == 'air': Planner.air(symptom[sensor], room)

    @staticmethod
    def movement(symptom, room):
        code = symptom['code']
        if code == -1:
            print(f'WARNING({room}): Alarm should be activate!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'alarm', 'value': 1})

            time.sleep(30)

            print(f'WARNING({room}): Alarm should be deactivate!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'alarm', 'value': 0})

    @staticmethod
    def temperature(symptom, room):
        code = symptom['code']
        if code == -1:
            print(f'WARNING({room}): Cool conditioner should be activate!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'cool_conditioner', 'value': 1})
            requests.post(Url.executor, json={'room': room, 'actuator': 'hot_conditioner', 'value': 0})
        if code == 1:
            print(f'WARNING({room}): Hot conditioner should be activate!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'hot_conditioner', 'value': 1})
            requests.post(Url.executor, json={'room': room, 'actuator': 'cool_conditioner', 'value': 0})
        if code == 0:
            print(f'INFO({room}): Temperature measurement is okay!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'cool_conditioner', 'value': 0})
            requests.post(Url.executor, json={'room': room, 'actuator': 'hot_conditioner', 'value': 0})

    @staticmethod
    def air(symptom, room):
        code = symptom['code']
        if code == -1:
            print(f'WARNING({room}): Fan should be activate!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'fan', 'value': 1})
        if code == 0:
            print(f'INFO({room}): Air measurement is okay!!')
            requests.post(Url.executor, json={'room': room, 'actuator': 'fan', 'value': 0})
