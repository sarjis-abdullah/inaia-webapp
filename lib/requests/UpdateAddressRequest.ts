export interface UpdateAddressRequest{
    id:number;
    type_id:number;
    contact_id:number;
    line1?:string;
    line2?:string;
    postal_code?:string;
    city?:string;
    region?:string;
    country_id?:number;
    is_primary:boolean;
    is_active:boolean;
}