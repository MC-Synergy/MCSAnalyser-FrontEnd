import { Chart } from "chart.js";
import { useEffect } from "react";

export function Graph(){

    

    const chartConfig = {

    }

    useEffect(() => {
        const element = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = element.getContext('2d') as CanvasRenderingContext2D;
        //const myChart = new Chart(ctx)
    })

    return (
        <div>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    )
}