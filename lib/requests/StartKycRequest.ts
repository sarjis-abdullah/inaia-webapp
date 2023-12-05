export interface StartKycRequest{
    name:string,
    surname:string,
    gender:string,
    birth_date:string,
    line1:string,
    line2?:string,
    postal_code:string,
    city:string,
    region?:string,
    country_id:number,
    birth_place:string,
    nationality_id:string,
}