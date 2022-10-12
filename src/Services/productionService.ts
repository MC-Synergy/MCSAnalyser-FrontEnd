import { BorderColors, DataSet, ItemsProduced, MCSSystem } from "../Models/Types";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL =  'http://mcsynergy.nl/api/production'
//const BASE_URL = 'http://localhost:8080/api/production'


export function createProductionGraphDataSets(itemsProduced: ItemsProduced, borderColors: BorderColors): DataSet[] {
  let datasets: DataSet[] = []
  for (const [key, value] of Object.entries(itemsProduced)) {
    let borderColor = 'rgba(57, 89, 255, 0.8)'

    if (borderColors[key] != null) borderColor = borderColors[key]

    const dataset: DataSet = {
      label: key,
      data: value,
      borderColor: borderColor,
      parsing: {
        xAxisKey: 'timeSent',
        yAxisKey: 'amountProduced'
      }
    }
    datasets.push(dataset)
  }
  return datasets;
}

export function useProductionData(mcsSystemID: number, accumulated: boolean): {data: MCSSystem, loading: boolean} {
  const [data, setData] = useState({} as MCSSystem);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(BASE_URL + '/get-by-system-id', {params: {
            mcssystemid: mcsSystemID,
            accumulated: accumulated
        }})

        setData({
          id: mcsSystemID,
          name: "Not implemented yet",
          itemsProduced: response
        } as MCSSystem);
        setLoading(false);
      } catch (err) {
        console.error(err)
      }
    };

    fetchData();
  }, [mcsSystemID, accumulated]);

  return {
    data,
    loading,
  };
};