import React, {useEffect} from 'react';
import {InfluxDB} from '@influxdata/influxdb-client';
import {DB, InfluxData, Point} from '../../influxdb/DB';
import {useStateIfMounted} from 'use-state-if-mounted';
import LineChart from "../../charts/LineChart";
import {useInterval} from 'usehooks-ts';
import {Line} from "react-chartjs-2";
import MySvg from "../../svg/MySvg";
import Api from "../../api/Api";

interface IProps {measurement: string; room: string}
function Actuator(props: IProps) {
    const measurement = props.measurement;
    const room = props.room;

    const [data, setData] = useStateIfMounted(0);

    const load = async() => {
        const res: InfluxData[] = [];
        const options = {'url': DB.url, 'token': DB.token};
        const client = await new InfluxDB(options).getQueryApi(DB.org);
        await client.queryRows(DB.queryActuator(props.room, measurement), {
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
                const obj = datums[datums.length - 1];
                if(obj) setData(obj.y);
                else setData(0);
            },
            error(error: Error): void {console.log('Error', error)}
        })
    }

    const click = async(value: number) => {
        await Api.post(room, measurement, value);
        await new Promise( resolve => setTimeout(resolve, 5 * 1000));
        await load();
    }

    useEffect(() => {load().then()}, [props.room]);
    useInterval(async() => {await load()}, 30 * 1000);

    return(<div className={"ms-5 card shadow"}>
        <label>{measurement.toUpperCase().replaceAll('_', ' ')}</label>
        <hr />
        {(measurement === 'hot_conditioner') && <MySvg code={422272} name={'celebration-christmas-fireworks'} width={75} />}
        {(measurement === 'cool_conditioner') && <MySvg code={422271} name={'christmas-cold-snowflake'} width={75} />}
        {(measurement === 'fan') && <MySvg code={300080} name={'fan'} width={75} />}
        {(measurement === 'locker') && <MySvg code={485175} name={'lock'} width={75} />}
        {(measurement === 'alarm') && <MySvg code={484985} name={'triangular-display-board'} width={75} />}
        <hr />
        {(data) ?
            <div>
                Status: <label><b className={"text-success"}>ON</b></label>
                <br />
                <button className={'mt-3 btn btn-primary'} onClick={() => click(0)}>
                    Force Deactivation
                </button>
            </div>:
            <div>
                Status: <label><b className={"text-danger"}>OFF</b></label>
                <br />
                <button className={'mt-3 btn btn-primary'} onClick={() => click(1)}>
                    Force Activation
                </button>
            </div>
        }
    </div>);


}

export default Actuator;
