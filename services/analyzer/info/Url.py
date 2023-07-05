from info.Debug import Debug


class Url:
    planner = 'http://localhost:5001/planner' if Debug.active else 'http://172.20.0.105:5001/planner'
    influxdb = 'http://localhost:8086' if Debug.active else 'http://172.20.0.102:8086'
