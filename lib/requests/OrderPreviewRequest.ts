import { OrderTypes } from "../contants";

export interface OrderPreviewRequest {
    order_type:OrderTypes,
    depot_id:number,
    amount:number,
    unit:string
}