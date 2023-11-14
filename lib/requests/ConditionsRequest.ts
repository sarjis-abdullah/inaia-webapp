import { ConditionTypes } from "../contants";

export interface ConditionsRequest{
    countryId?:number;
    type?:ConditionTypes;
}