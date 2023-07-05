import json
import influxdb_client
from info.Url import Url


class Database:
    def __init__(self):
        self.bucket = 'seas'
        self.org = 'univaq'
        self.token = 'OyXMBFCcvdsVQhNOIrZCEnPJXbntUpdiF6sKoBWmUtYJv6JKWVm4iUWfMGoFL21LEtqlFiEKtowBYfJ-64g5ow=='
        self.url = Url.influxdb
        self.client = influxdb_client.InfluxDBClient(org=self.org, token=self.token, url=self.url)

    def get_rooms(self):
        query_api = self.client.query_api()
        query = f'import "influxdata/influxdb/schema" schema.tagValues(bucket: "seas", tag: "room")'
        results = query_api.query(org=self.org, query=query)
        rooms = []
        for element in results.to_values():
            rooms.append(list(element)[2])

        return rooms

    def get_data(self, room: str, device: str, range: int):
        query_api = self.client.query_api()
        query = f'from(bucket: "seas") |> range(start: -{range}m)  |> filter(fn: (r) => r["_measurement"] == "rooms")  ' \
                f'|> filter(fn: (r) => r["room"] == "{room}")  |> filter(fn: (r) => r["_field"] == "{device}")  ' \
                f'|> yield(name: "last")'
        result = query_api.query(org=self.org, query=query)
        values = []
        for value in json.loads(result.to_json()):
            values.append(value['_value'])
        return values

