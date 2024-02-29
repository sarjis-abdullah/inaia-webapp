import { AssetTypes } from './../contants/AssetTypes';
export interface Asset{
    name : AssetTypes,
    amount?: number,
    unit: string,
    gold_in_euro?:number,
    silver_in_euro?:number
}