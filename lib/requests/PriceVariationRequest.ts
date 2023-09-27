import { PricePeriods } from "../contants";

export interface PriceVariationRequest{
    period:PricePeriods,
    currency:string
}