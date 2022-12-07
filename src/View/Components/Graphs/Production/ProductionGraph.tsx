import Chart from 'chart.js/auto';
import { ChartConfiguration } from "chart.js";
import { useEffect, useState } from "react";
import { createProductionGraphDataSets, useProductionData } from "../../../../Services/productionService";
import 'chartjs-adapter-moment';
import { BorderColors, LineGraphDataSet } from "../../../../Models/Types";
import "../../../Styles/GraphStyles.css"

const MS_IN_MINUTE = 60000;

export interface ProductionGraphProps {
    graphTitle: string,
    canvasID: string,
    lineColors: BorderColors,
    mcsSystemID: number,
    accumulated: boolean,
    timeSpanAsMinutes?: number,
    intervalAsMinutes?: number,
}

export function ProductionGraph({canvasID, graphTitle, lineColors, mcsSystemID, accumulated, intervalAsMinutes, timeSpanAsMinutes}: ProductionGraphProps){
    const {data: mcsSystem, loading, refreshData} = useProductionData(mcsSystemID, accumulated, timeSpanAsMinutes, intervalAsMinutes);
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        if (refresh) {
            refreshData()
        }
        setRefresh(false)
        if (loading) {
            return
        }
        const datasets: LineGraphDataSet[] = createProductionGraphDataSets(mcsSystem.itemsProduced, lineColors)
        let timeSpanStart = undefined
        if (typeof timeSpanAsMinutes == "number") {
            console.log(timeSpanAsMinutes)
            timeSpanStart = new Date(Date.now() - (timeSpanAsMinutes * MS_IN_MINUTE)).toString()
            console.log(timeSpanStart)
        }

        const chartConfig : ChartConfiguration = {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                parsing: {
                    xAxisKey: 'timeSent',
                    yAxisKey: 'amountProduced'
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            displayFormats: {
                                hour: 'HHu'
                            }
                        },
                        grid: {
                            color: "rgba(170, 207, 209, 0.4)"
                        },
                        min: timeSpanStart,
                        max: Date.now()
                    },
                    y: {
                        grid: {
                            color: "rgba(170, 207, 209, 0.4)"
                        },
                        min: 0
                    },
                },
                plugins: {
                    legend: { 
                        position: 'top'
                    },
                },

            }
        }

        const systemNameElement = document.getElementById(canvasID + "SystemNameElement") as HTMLDivElement;
        systemNameElement.textContent = mcsSystem.name;

        const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const myChart = new Chart(ctx, chartConfig)

        return () => {
            myChart.destroy()
        }
        
    }, [loading, mcsSystem, canvasID, lineColors, refresh, refreshData])
    
    function refreshGraph() {
        setRefresh(true)
    }

    return (
        <div className="production-graph graph relative">
            <div id={canvasID+"TitleElement"} className='text-center mt-1'>{graphTitle}</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute top-1 right-1 cursor-pointer" onClick={refreshGraph}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <div id={canvasID+"SystemNameElement"} className='text-center text-sm'>Loading...</div>
            <canvas id={canvasID}></canvas>
        </div>
    )
}