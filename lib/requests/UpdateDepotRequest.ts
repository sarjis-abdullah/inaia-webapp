export interface UpdateDepotRequest {
    id?:number;
    name?:string;
    account_id?:number;
    interval_id?:number;
    conditions?:string;
    target_type_id?:number;
    depot_type_id?:number;
    avatar_base64?:string;
    avatar_url?:string;
    agio_payment_option?:string;
    interval_amount?:number;
    interval_day?:number;
    interval_startdate?:string;
    duration?:number;
    payment_method?:string;
    payment_account_id?:number
}