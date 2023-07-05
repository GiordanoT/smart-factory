from info.Debug import Debug


class Url:
    mqtt = 'localhost' if Debug.active else '172.20.0.100'
