import React, {useEffect} from 'react';
import {InfluxDB} from '@influxdata/influxdb-client';
import {DB, InfluxData, Point} from '../../influxdb/DB';
import {useStateIfMounted} from 'use-state-if-mounted';
import {useInterval} from 'usehooks-ts';
import MySvg from "../../svg/MySvg";
import Api from "../../api/Api";
import PlaySVG from '../../static/svg/play.svg';
import StopSVG from '../../static/svg/stop.svg';

interface IProps {measurement: string; room: string}
function Actuator(props: IProps) {
    const measurement = props.measurement;
    const room = props.room;

    const [data, setData] = useStateIfMounted(0);
    const [disabled, setDisabled] = useStateIfMounted(false);

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
        setDisabled(true);
        await Api.post(room, measurement, value);
        await new Promise( resolve => setTimeout(resolve, 5 * 1000));
        await load();
        setDisabled(false);
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
                <hr />
                <div>
                    <i className={'bi bi-exclamation-triangle-fill'} />
                    <label className={'ms-2'}>Manual Mode</label>
                </div>
                <button disabled={disabled} className={'mt-2 btn'} onClick={() => click(0)}>
                    <div className={"d-block mx-auto"}>
                        <img src={StopSVG} width={40} />
                    </div>
                </button>
            </div>:
            <div>
                Status: <label><b className={"text-danger"}>OFF</b></label>
                <hr />
                <div>
                    <i className={'bi bi-exclamation-triangle-fill'} />
                    <label className={'ms-2'}>Manual Mode</label>
                </div>
                <button disabled={disabled} className={'mt-2 btn'} onClick={() => click(1)}>
                    <div className={"d-block mx-auto"}>
                        <img src={PlaySVG} width={40} />
                    </div>
                </button>
            </div>
        }
    </div>);


}

export default Actuator;
