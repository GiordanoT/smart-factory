import React from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import Actuator from "../data/Actuator";
import MySvg from "../../svg/MySvg";
import GrafanaSensor from "../data/GrafanaSensor";

interface IProps {room: 'A'|'B'|'C'}
function Room(props: IProps) {
    const room = props.room;
    const measurements = ['Movement', 'Temperature', 'Air'];
    const [measurement, setMeasurement] = useStateIfMounted('temperature');
    return(<>
        <nav className={"navbar navbar-dark bg-first border-bottom border-default shadow"}>
            {measurements.map((id, index) => {
                return(<button key={index} className={'me-3 btn bg-white'} onClick={() => setMeasurement(id.toLowerCase())}>
                    {(id === 'Movement') && <MySvg code={475596} name={'walk'} width={35} />}
                    {(id === 'Temperature') && <MySvg code={475590} name={'temperature'} width={35} />}
                    {(id === 'Air') && <MySvg code={475599} name={'wind-svg'} width={35} />}
                </button>);
            })}
        </nav>
        <div className={'container'}>
            <label><b>Room {room}</b> (<u style={{textDecoration: 'none', color: 'indigo'}}>{measurement}</u>)</label>
            <hr />
            {(measurement === 'movement') && <>
                <div className={'d-flex'}>
                    <GrafanaSensor room={room} measurement={'movement'} />
                    <Actuator room={room} measurement={'locker'} />
                    <Actuator room={room} measurement={'alarm'} />
                </div>
            </>}
            {(measurement === 'temperature') && <>
                <div className={'d-flex'}>
                    <GrafanaSensor room={room} measurement={'temperature'} />
                    <Actuator room={room} measurement={'hot_conditioner'} />
                    <Actuator room={room} measurement={'cool_conditioner'} />
                </div>
            </>}
            {(measurement === 'air') && <>
                <div className={'d-flex'}>
                    <GrafanaSensor room={room} measurement={'air'} />
                    <Actuator room={room} measurement={'fan'} />
                </div>
            </>}
        </div>
    </>);
}

export default Room;
