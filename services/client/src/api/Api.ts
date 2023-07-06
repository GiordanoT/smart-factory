import axios from "axios";

interface Request {room: string, actuator: string, value: number}
export default class Api {
    static url = 'http://localhost:5002/executor';
    static async post(room: string, measurement: string, value: number) {
        const request: Request = {
            room: room,
            actuator: measurement,
            value: value
        };
        return await axios.post(Api.url, request);
    }
}
