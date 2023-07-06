import React, {useEffect} from 'react';
import {InfluxDB} from '@influxdata/influxdb-client';
import {DB, InfluxData, Point} from '../../influxdb/DB';
import {useStateIfMounted} from 'use-state-if-mounted';
import LineChart from "../../charts/LineChart";
import {useInterval} from 'usehooks-ts';

interface IProps {measurement: string; room: string}
function Sensor(props: IProps) {
    const [data, setData] = useStateIfMounted<Point[]>([]);

    const load = async() => {
        const res: InfluxData[] = [];
        const options = {'url': DB.url, 'token': DB.token};
        const client = await new InfluxDB(options).getQueryApi(DB.org);
        await client.queryRows(DB.querySensor(props.room, props.measurement, 5), {
            next(row, tableMeta) {res.push(tableMeta.toObject(row) as InfluxData)},
            complete(): void {
                const datums: Point[] = [];
                for(let row of res) {
                    const datum: Point = {
                        x: '',
                        y: row._value
                    };
                    datums.push(datum);
                }
                setData(datums);
            },
            error(error: Error): void {console.log('Error', error)}
        })
    }

    useEffect(() => {load().then()}, [props.room]);
    useInterval(async() => {await load()}, 30 * 1000);

    return(<LineChart label={props.measurement} data={data} />);
}
export default Sensor;
