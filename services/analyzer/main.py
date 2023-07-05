import time
import requests
from components.Analyzer import Analyzer
from components.Database import Database
from components.Room import Room
from components.Statistics import Statistics
from info.Url import Url

REFRESHING_RATE = 15


def main():
    db = Database()
    rooms = db.get_rooms()
    while True:
        data = {}
        analyzer = Analyzer()
        for room in rooms:
            analyzer.set_room(room)
            data[room] = {}
            for sensor in Room.get_sensors():
                measurements = db.get_data(room, sensor, 2)
                measurements_mean = Statistics.calculate(measurements)['mean']
                data[room][sensor] = measurements_mean
            for actuator in Room.get_actuators():
                measurements = db.get_data(room, actuator, 1)
                measurements_mode = Statistics.calculate(measurements)['mode']
                data[room][actuator] = measurements_mode

            analyzer.set_data(data[room])
            analyzer.check_movement()
            analyzer.check_temperature()
            analyzer.check_air()
        symptoms = analyzer.symptoms
        print(f'Symptoms: {symptoms}')
        if symptoms: requests.post(Url.planner, json=symptoms)
        time.sleep(REFRESHING_RATE)


if __name__ == '__main__':
    main()

