import { Condition } from "./Condition"

export interface OrderPreview {
    amount:number,
    unit:string,
    gram_price_trading:number,
    gram_price_raw:number,
    fee:number,
    order_type_id:number,
    logo:string,
    logo_file:string,
    conditions:{
        gold_one_time:Array<Condition>,
        silver_one_time:Array<Condition>
    }
}