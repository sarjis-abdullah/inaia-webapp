import { Address } from './Address';
import { PersonData } from './PersonData';
import { Product } from './Product';
import { Fee } from './Plan';
import { AccountSetting } from "./AccountSetting";
import { Channel } from './Channel';
import { KycStatus } from './KycStatus';

interface AmlStatus{
    id:number;
    name:string;
}
interface Plan{
    id:number;
    name:string;
    plan_fees?:Array<Fee>;

}
export interface KycDetail{
    id:string,
    session_token:string,
    status:string,
    url:string,
    vendor_data:string
}
interface AccountData{
    id:number;
    contact_id:number;
    type_id:number;
    account_number:string;
    username:string;
    is_active:boolean;
    is_locked:boolean;
    referral_code:string;
    has_pin:boolean;
    pin_length:number,
    created_at:string;
    settings:Array<AccountSetting>
    plan_id:number,
    plan?:Plan;
    plan_fee?:Fee;
    new_support_ticket_answer_count:number;
    new_inbox_message_count:number;
    contact:number;
    products:Array<Product>;
    kyc_details:KycDetail;
}
export interface Account{
    id:number;
    type_id:number;
    name:string;
    avatar:string;
    avatar_file:string;
    is_verified:boolean;
    aml_status_id:boolean;
    aml_search_id:number | null;
    aml_status:AmlStatus;
    created_at:string;
    account:AccountData;
    type?:any;
    person_data:PersonData;
    address?:Address;
    channels:Array<Channel>,
    kyc_status:KycStatus
}