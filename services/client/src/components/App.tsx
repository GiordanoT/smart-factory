import React from 'react';
import Room from "./room/Room";
import './index.scss';
import {useStateIfMounted} from "use-state-if-mounted";
function App() {
  const rooms: any = (process.env.REACT_APP_ROOMS)?.split(',');
  const [room, setRoom] = useStateIfMounted<any>(rooms[0]);
  return<>
    <div className={"leftbar border-right border-default shadow"}>
      <div className={"list"}>
        {rooms.map((id: any, index: number) => {
          return(<div key={index} className={"item"} onClick={() => {setRoom(id)}}>
            <i className="bi bi-house-fill"></i> Room {id}
          </div>);
        })}
      </div>
    </div>
    <Room room={room} />
  </>;
}

export default App;
