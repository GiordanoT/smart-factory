import React from 'react';
import Room from "./room/Room";
import './index.scss';
import {useStateIfMounted} from "use-state-if-mounted";
type TRoom = 'A'|'B'|'C';
function App() {
  const [room, setRoom] = useStateIfMounted<TRoom>('A');
  const rooms: TRoom[] = ['A', 'B', 'C'];
  return<>
    <div className={"leftbar border-right border-default shadow"}>
      <div className={"list"}>
        {rooms.map((id, index) => {
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
