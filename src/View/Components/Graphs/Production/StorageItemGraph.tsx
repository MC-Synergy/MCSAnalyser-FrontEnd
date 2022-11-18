import Chart from 'chart.js/auto';
import { ChartConfiguration } from "chart.js";
import { useEffect } from "react";
import { createStorageItemGraphDataSet, useStorageData } from "../../../../Services/storageService";

export interface StorageItemGraphProps {
  canvasID: string
}

export function StorageItemGraph({ canvasID }: StorageItemGraphProps) {
  const { data: storage, loading } = useStorageData();
  useEffect(() => {
    if (loading) {
      return
    }

    const { dataSet, filledPercentage }  = createStorageItemGraphDataSet(storage.items);
    const chartConfig : ChartConfiguration = {
      type: 'pie',
      data: dataSet,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    }

    const systemNameElement = document.getElementById(canvasID + "SystemNameElement") as HTMLDivElement;
    systemNameElement.textContent = storage.name;

    const percentageFilledInfoElement = document.getElementById(canvasID + "percentageFilledInfoElement") as HTMLDivElement;
    percentageFilledInfoElement.textContent = Math.round(filledPercentage) + "% of slots in " + storage.name + " are filled";

    const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const myChart = new Chart(ctx, chartConfig)

    return () => {
      myChart.destroy()
    }
  }, [storage, loading, canvasID])
  return (
    <div className="storage-item-graph graph relative">
      <div id={canvasID + "TitleElement"} className='text-center mt-1'>Space in Storage</div>
      <div id={canvasID + "SystemNameElement"} className='text-center text-sm'>Loading...</div>
      <canvas id={canvasID}></canvas>
      <div id={canvasID + "percentageFilledInfoElement"} className='text-center h-10 mt-5'></div>
    </div>
  )
}