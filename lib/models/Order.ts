import { Depot } from "./Depot";
import { OrderPaymentTransaction } from "./OrderPaymentTransaction";
import { OrderStatus } from "./OrderStatus";
import { OrderTransaction } from "./OrderTransaction";
import { OrderType } from "./OrderType";

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
    amount:number,
    transactions:Array<OrderTransaction>,
    unit:string,
    updated_at?:string,
    updated_by?:number
}