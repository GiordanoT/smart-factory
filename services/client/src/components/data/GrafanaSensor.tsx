import React, {useEffect} from 'react';
import {InfluxDB} from '@influxdata/influxdb-client';
import {DB, InfluxData, Point} from '../../influxdb/DB';
import {useStateIfMounted} from 'use-state-if-mounted';
import LineChart from "../../charts/LineChart";
import {useInterval} from 'usehooks-ts';
import Grafana from "../../grafana/Grafana";

interface IProps {measurement: 'movement'|'temperature'|'air'; room: 'A'|'B'|'C'}
function GrafanaSensor(props: IProps) {
    const measurement = props.measurement;
    const room = props.room;
    return(<iframe src={Grafana.graphs[room][measurement]} width={600} height={300}></iframe>);
}
export default GrafanaSensor;
