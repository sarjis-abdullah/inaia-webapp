export interface AddressRequest{
    line1:string;
    line2?:string;
    region?:string;
    city:string;
    country_id:number;
    street:string;
    postal_code:string;
}