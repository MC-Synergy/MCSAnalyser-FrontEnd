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

export interface DataSet {
    label: string,
    data: any[],
    parsing: {
        xAxisKey: string,
        yAxisKey: string
    }
    borderColor: string;
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
    maxItemCount: number
}