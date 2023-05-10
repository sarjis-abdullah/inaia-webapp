import { OrderTypes } from './../contants/OrderTypes';
export interface OrderType{
    created_at?:string,
    deleted_at?:number,
    id:number,
    name_translation_key:OrderTypes,
    updated_at?:string
}