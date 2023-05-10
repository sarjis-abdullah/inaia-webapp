import { TransactionTypes } from "../contants/TransactionTypes";

export interface TransactionType{
    created_at?:string,
    deleted_at?:number,
    id:number,
    name_translation_key:TransactionTypes,
    updated_at?:string
}