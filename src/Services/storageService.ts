import { Storage } from "../Models/Types";
import axios from "axios";
import { useEffect, useState } from "react";

const STORAGE_NAME = "Storage";
const STORAGE_API_URL = process.env.REACT_APP_STORAGE_API_URL;
const MAX_ITEMS_IN_STORAGE = 63452160

export default function useStorageData() {
  const [data, setData] = useState({} as Storage);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: storageRes } = await axios.get(STORAGE_API_URL + "/get/all/grouped", { params: { sort: "highest" } })

        setData({
          name: STORAGE_NAME,
          items: storageRes,
          maxItemCount: MAX_ITEMS_IN_STORAGE,

        } as Storage);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [])
  return { 
    data, 
    loading 
  };
};