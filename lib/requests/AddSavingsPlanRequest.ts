export interface AddSavingsPlanRequest {
    name:string;
    interval_id:number;
    conditions:string;
    agio_payment_option?:string;
    interval_amount?:number;
    interval_day?:number;
    interval_startdate?:string;
    duration?:number;
    payment_method?:string;
    payment_account_id?:number
}