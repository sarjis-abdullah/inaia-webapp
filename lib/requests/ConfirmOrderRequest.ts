export interface ConfirmOrderRequest {
    order_type_id:number,
    depot_id:number,
    amount:number,
    unit:string,
    conditions:Array<number>,
    payment_method?:string,
    payment_account_id?:number,
    approval_id?:number,
    pin:string
}