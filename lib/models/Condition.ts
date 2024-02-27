import { Country } from "./Country"

export interface Document {
    id:number,
    link:string
}
export interface Condition {
    id:number,
    title:string,
    is_active:boolean,
    sort_order:number,
    condition_type_id:number,
    condition_type_name:string,
    condition_type_prerequisite_for:string,
    country:Country
    document?:Document
}