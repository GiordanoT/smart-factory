import React from 'react';
import Grafana from "../../grafana/Grafana";

interface IProps {measurement: 'movement'|'temperature'|'air'; room: 'A'|'B'|'C'}
function GrafanaSensor(props: IProps) {
    const measurement = props.measurement;
    const room = props.room;
    return(<iframe className={'border-default rounded shadow'} src={Grafana.graphs[room][measurement]} width={550} height={300}></iframe>);
}
export default GrafanaSensor;
