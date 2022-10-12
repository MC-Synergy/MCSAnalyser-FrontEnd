import Chart from 'chart.js/auto';
import {ChartConfiguration} from "chart.js";
import { useEffect } from "react";
import { createProductionGraphDataSets, useProductionData } from "../../../../Services/productionService";
import 'chartjs-adapter-moment';
import { BorderColors, DataSet } from "../../../../Models/Types";
import "../../../Styles/GraphStyles.css"

export interface ProductionGraphProps {
    canvasID: string,
    lineColors: BorderColors,
    mcsSystemID: number,
    accumulated: boolean
}

export function ProductionGraph({canvasID, lineColors, mcsSystemID, accumulated}: ProductionGraphProps){

    const {data: mcsSystem, loading} = useProductionData(mcsSystemID, accumulated);
    
    useEffect(() => {
        if (loading) {
            return
        }

        const datasets: DataSet[] = createProductionGraphDataSets(mcsSystem.itemsProduced, lineColors)
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
                                hour: 'HH'
                            }
                        },
                        grid: {
                            color: "rgba(170, 207, 209, 0.4)"
                        }
                    },
                    y: {
                        grid: {
                            color: "rgba(170, 207, 209, 0.4)"
                        }
                    }
                },
                plugins: {
                    legend: { 
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: mcsSystem.name,
                        position: 'top',
                    }
                },

            }
        }
        const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const myChart = new Chart(ctx, chartConfig)

        return () => {
            myChart.destroy()
        }
        
    }, [loading, mcsSystem, canvasID, lineColors])

    return (
        <div className="production-graph">
            <canvas id={canvasID}></canvas>
        </div>
    )
}