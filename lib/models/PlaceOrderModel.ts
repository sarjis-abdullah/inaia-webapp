import { ConfirmationMethod } from "./ConfirmationMethod"

export interface PlaceOrderModel {
    approval_id:number,
    payload:{
        order_type_id:number,
        depot_id:number,
        amount:number,
        unit:string,
        conditions:number,
        payment_method:string,
        payment_account_id:number
    },
    confirmation_url:string,
    http_method:string,
    order_approval_method_id:number,
    order_approval_method:ConfirmationMethod,
    hash:string,
    extra?:any,
    type:string,
    expires_in:number
}