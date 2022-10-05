import { ProductionPoint } from "../Models/DataPoints";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL =  'http://mcsynergy.nl/api/production'


export function useProductionData(mcsSystemID: number): {data: ProductionPoint[], loading: boolean} {
  const [data, setData] = useState([] as ProductionPoint[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(BASE_URL + '/get-by-system-id', {params: {
            mcssystemid: mcsSystemID
        }})
        setData(response);
      } catch (err) {
        console.error(err)
      }
      setLoading(false);
    };

    fetchData();
  }, [mcsSystemID]);

  return {
    data,
    loading,
  };
};