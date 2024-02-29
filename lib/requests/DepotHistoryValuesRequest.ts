import { PricePeriods } from "../contants";

export interface DepotHistoryValuesRequest{
    period:PricePeriods,
    depot_id:number
}