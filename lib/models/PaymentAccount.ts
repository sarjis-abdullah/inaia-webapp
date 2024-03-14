import { type PaymentAccountSpec } from "./PaymentAccountSpec";
import { type PaymentMethod } from "./PaymentMethod";

export interface PaymentAccount{
    created_at?:string,
    id:number,
    account_id:number,
    confirmation_checked:boolean,
    created_by:number,
    is_default:boolean,
    is_verified:boolean,
    updated_by:string,
    payment_account_specs:Array<PaymentAccountSpec>,
    payment_method:PaymentMethod
}
