class Room:
    @staticmethod
    def get_sensors():
        return ['movement', 'temperature', 'air']

    @staticmethod
    def get_actuators():
        return ['alarm', 'locker', 'hot_conditioner', 'cool_conditioner', 'fan']

    @staticmethod
    def get_devices():
        return [*Room.get_sensors(), *Room.get_actuators()]
