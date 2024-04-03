import { type Account } from "./Account"
import { type DepotStatus } from "./DepotStatus"
import { type DepotType } from "./DepotType"
import { type SavingPlanTarget } from "./SavingPlanTarget"

export interface PaymentDetails {
    inaia_iban: string;
    reference: string;
}
export interface Depot{
    account?:Account
    account_id:number,
    agio:number,
    agio_payment_option:string,
    agio_percentage:number,
    agio_transactions?:any,
    avatar?:string,
    avatar_file?:string
    created_at:string,
    created_by:number,
    currency:string,
    default_depot?:number,
    deleted_at?:string,
    deleted_by?:number,
    depot_number:number,
    depot_status_id:number,
    depot_type_id:number,
    depot_type?:DepotType
    gram_amount?:number,
    gram_amount_pending_orders?:number,
    id:number,
    interval?:any,
    interval_amount?:number,
    interval_day?:number,
    interval_enddate?:string,
    interval_id?:number,
    interval_startdate?:string,
    is_savings_plan?:number,
    invested_amount?:number,
    is_storage_fee_included:number,
    last_savings_order_date?:string,
    last_storage_fee_claim_date?:string,
    name:string,
    orders?:any,
    payment_account_id?:number,
    payment_method:string,
    progress?:number,
    sort_order:number,
    status:DepotStatus,
    status_history?:any,
    status_id:number,
    target_amount?:number,
    target_type:SavingPlanTarget,
    target_type_id?:number,
    updated_at?:string,
    updated_by?:number,
    payment_details?: PaymentDetails
}