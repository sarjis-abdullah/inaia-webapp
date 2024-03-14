import { type Depot } from "./Depot";
import { type OrderPaymentTransaction } from "./OrderPaymentTransaction";
import { type OrderStatus } from "./OrderStatus";
import { type OrderTransaction } from "./OrderTransaction";
import { type OrderType } from "./OrderType";

export interface Order{
    action_date?:string,
    agio_amount?:number,
    comment?:string,
    created_at:string,
    created_by:number,
    deleted_at?:string,
    deleted_by?:number,
    depot:Depot,
    depotName:string,
    depot_id:number,
    id:number,
    logo:string,
    logo_file:string,
    order_process_id?:number,
    order_status?:OrderStatus,
    order_status_id:number,
    order_type:OrderType,
    order_type_id:number,
    orders_payment_transactions:Array<OrderPaymentTransaction>,
    plan_id:number,
    purchase_amount?:number,
    storage_fee?:number,
    amount:number,
    transactions:Array<OrderTransaction>,
    unit:string,
    updated_at?:string,
    updated_by?:number,
    reason_text?:string,
    blocked_days?:number
}