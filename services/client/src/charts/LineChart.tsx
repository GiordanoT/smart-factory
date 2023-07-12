import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {Point} from '../influxdb/DB';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IProps {label: string, data: Point[]}
function LineChart(props: IProps) {

    const options = {
        responsive: true,
        animation: {duration: 0.2},
        plugins: {legend: {display: false} },
    };

    const data = {
        labels: props.data.map(point => point.x),
        datasets: [
            {
                label: props.label,
                data: props.data.map(point => point.y),
                borderColor: 'rgb(81,0,140)',
                backgroundColor: 'rgb(75,0,130)',
            }
        ],
    };
    return(<div className={"card w-50 shadow p-3"}>
        <Line options={options} data={data} />
    </div>);
}
export default LineChart;
