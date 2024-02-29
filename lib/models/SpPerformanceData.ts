export interface DataItem{
    year:number,
    value:number
}
export interface SpPerformanceData {
    agioData:Array<DataItem>,
    savingsData:Array<DataItem>,
    returnsData:Array<DataItem>
}