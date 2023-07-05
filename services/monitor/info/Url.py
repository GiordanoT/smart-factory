from info.Debug import Debug


class Url:
    influxdb = 'http://localhost:8086' if Debug.active else 'http://172.20.0.102:8086'
    mqtt = 'localhost' if Debug.active else '172.20.0.100'
