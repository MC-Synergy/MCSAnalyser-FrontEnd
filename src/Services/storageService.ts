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

  //Test
  let totalStacks = 0
  itemStackCounts.forEach(stackCount => {
    totalStacks += stackCount
  });
  console.log("expected: " + SLOTS_IN_STORAGE)
  console.log("actual: " + totalStacks)
  console.log("successful: " + (SLOTS_IN_STORAGE === totalStacks))

  const dataSet: PieGraphData = {
    labels: itemNames,
    datasets: [{
      label: 'Slots taken',
      data: itemStackCounts,
      backgroundColor: ["rgba(89, 116, 29, 1)", "rgba(254, 125, 20, 1)", "rgba(56, 60, 166, 1)", "rgba(66, 72, 75, 1)", "rgba(255, 255, 255, 1)"]
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
        const { data: storageRes } = await axios.get(STORAGE_API_URL + "/get/all/grouped", { params: { sort: "highest" } })

        setData({
          name: STORAGE_NAME,
          items: storageRes,
          totalSlotsInStorage: SLOTS_IN_STORAGE,

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