export interface ProductionPoint {
  id: number,
  mcsSystemID: number,
  timeSent: Date,
  amountProduced: number,
  timeSpanAsSeconds: number,
  itemName: string
}

export interface ItemsProduced {
  [key: string]: ProductionPoint[]
}

export interface MCSSystem {
  id: number,
  name: string,
  itemsProduced: ItemsProduced
}

export interface LineGraphDataSet {
  label: string,
  data: any[],
  parsing: {
    xAxisKey: string,
    yAxisKey: string
  }
  borderColor: string;
}

export interface PieGraphDataSet {
  label: string,
  data: number[],
  backgroundColor: string[]
}

export interface PieGraphData {
  labels: string[],
  datasets: PieGraphDataSet[]
}

export interface BorderColors {
  //itemName : borderColor
  [itemName: string]: string
}

export interface Item {
  name: string
  displayname: string
  count: number
  stacksize: number
}

export interface Storage {
  items: Item[]
  name: string
  totalSlotsInStorage: number
}