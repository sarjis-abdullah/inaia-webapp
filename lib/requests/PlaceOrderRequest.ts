export interface PlaceOrderRequest {
    order_type_id:string,
    depot_id:string,
    amount:string,
    unit:string,
    conditions:Array<number>,
    payment_method?:string,
    payment_account_id?:number,
    comment?:string,
    order_approval_method?:String
}