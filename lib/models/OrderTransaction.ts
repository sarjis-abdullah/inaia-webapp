import { TransactionType } from "./TransactionType";

export interface OrderTransaction{
    created_at:string,
    deleted_at?:string,
    depot_balance_after?:number,
    depot_balance_before?:number,
    fee?:number,
    gram_amount:number,
    gram_price_date:string,
    gram_price_raw?:number,
    gram_price_trading?:number,
    id:number,
    money_amount?:number,
    order_id?:number,
    transaction_type:TransactionType,
    transaction_type_id:number
}