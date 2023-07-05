import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
from info.Url import Url


class Database:
    @staticmethod
    def write(topic: str, data: float):
        bucket = 'seas'
        org = 'univaq'
        token = 'OyXMBFCcvdsVQhNOIrZCEnPJXbntUpdiF6sKoBWmUtYJv6JKWVm4iUWfMGoFL21LEtqlFiEKtowBYfJ-64g5ow=='
        url = Url.influxdb
        client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)
        api = client.write_api(write_options=SYNCHRONOUS)

        topic = topic.split("/")
        room = topic[1]
        field = topic[3]

        record = influxdb_client.Point('rooms').tag('room', room).field(field, data)
        api.write(bucket=bucket, org=org, record=record)

