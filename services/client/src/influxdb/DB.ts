export class DB {
    static url = 'http://localhost:8086';
    static org = 'univaq';
    static bucket = 'seas';
    static token =  'OyXMBFCcvdsVQhNOIrZCEnPJXbntUpdiF6sKoBWmUtYJv6JKWVm4iUWfMGoFL21LEtqlFiEKtowBYfJ-64g5ow==';

    static querySensor(room: string, measurement: string, range: number) {
        return `from(bucket: "${DB.bucket}")
          |> range(start: -${range}m)
          |> filter(fn: (r) => r["_measurement"] == "rooms")
          |> filter(fn: (r) => r["_field"] == "${measurement}")
          |> filter(fn: (r) => r["room"] == "${room}")
          |> aggregateWindow(every: 15s, fn: mean, createEmpty: false)
          |> yield(name: "mean")`;
    }

    static queryActuator(room: string, measurement: string) {
        return `from(bucket: "${DB.bucket}")
          |> range(start: -1h)
          |> filter(fn: (r) => r["_measurement"] == "rooms")
          |> filter(fn: (r) => r["_field"] == "${measurement}")
          |> filter(fn: (r) => r["room"] == "${room}")
          |> aggregateWindow(every: 15s, fn: mean, createEmpty: false)
          |> yield(name: "last")`;
    }
}

export interface InfluxData {
    result: string;
    room: string;
    table: number;
    _field: string;
    _measurement: string;
    _start: string;
    _stop: string;
    _time: string;
    _value: number;
}

export interface Point {
    x: string;
    y: number;
}
