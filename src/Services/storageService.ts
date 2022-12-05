import { Item, PieGraphData, Storage } from "../Models/Types";
import axios from "axios";
import { useEffect, useState } from "react";

const STORAGE_NAME = "Storage";
const STORAGE_API_URL = process.env.REACT_APP_STORAGE_API_URL;
const SLOTS_IN_STORAGE = 866052;

export function createStorageItemGraphDataSet(items: Item[]): { dataSet: PieGraphData, filledPercentage: number  }  {
  let totalUsedSlots: number = 0
  const itemNames: string[] = [];
  const itemStackCounts: number[] = [];

  //Add top 3 items to dataset
  for (let i = 0; i < 3 && i < items.length; i++) {
    const item: Item = items[i];
    const itemStacks: number = Math.ceil(item.count / item.stacksize);
    totalUsedSlots += + itemStacks;
    itemNames.push(item.displayname);
    itemStackCounts.push(itemStacks);
  }

  //Add other items to dataset
  let otherTotalStacks: number = 0
  for (let i = 3; i < items.length; i++) {
    const item: Item = items[i];
    const itemStacks: number = Math.ceil(item.count / item.stacksize);
    totalUsedSlots += itemStacks;
    otherTotalStacks += itemStacks;
  }
  itemNames.push("Other");
  itemStackCounts.push(otherTotalStacks);

  //Add empty slots to dataset
  const emptySlots: number = SLOTS_IN_STORAGE - totalUsedSlots
  itemNames.push("Empty")
  itemStackCounts.push(emptySlots)

  const dataSet: PieGraphData = {
    labels: itemNames,
    datasets: [{
      label: 'Slots taken',
      data: itemStackCounts,
      backgroundColor: ["rgba(44, 55, 33, 1)", "rgba(143, 195, 181, 1)", "rgba(70, 105, 162, 1)", "rgba(33, 98, 146, 1)", "rgba(15, 29, 48, 1)"]
    }]
  }

  const filledPercentage = (totalUsedSlots / SLOTS_IN_STORAGE) * 100

  return { dataSet, filledPercentage}
}

export function useStorageData() {
  const [data, setData] = useState({} as Storage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = axios.get(STORAGE_API_URL + "/get/all/grouped", { params: { sort: "highest" }, withCredentials: true})
        request.catch(err => {
          if (err.response.status === 401) {
            window.location.replace("https://portal.mcsynergy.nl?redirect=" + window.location)
          }
        })

        const storageRes = (await request).data;

        setData({
          name: STORAGE_NAME,
          items: storageRes,
          totalSlotsInStorage: SLOTS_IN_STORAGE,

        } as Storage);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [])
  return { 
    data, 
    loading
  };
};