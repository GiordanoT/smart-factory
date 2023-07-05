from info.Debug import Debug


class Url:
    planner = 'localhost' if Debug.active else '172.20.0.105'
    executor = 'http://localhost:5002/executor' if Debug.active else 'http://172.20.0.106:5002/executor'
