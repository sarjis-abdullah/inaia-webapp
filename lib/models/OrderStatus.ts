import { OrderStatuses } from "../contants/OrderStatuses";

export interface OrderStatus{
    created_at?:string,
    deleted_at?:number,
    id:number,
    name_translation_key:OrderStatuses,
    updated_at?:string
}
