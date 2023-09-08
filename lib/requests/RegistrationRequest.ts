export interface RegistrationRequest {
    prename:string,
    surname:string,
    mobile:string,
    email:string,
    password:string,
    conditions:string,
    country_id:number,
    plan_id?:number,
    payment_cycle?:string,
    allow_marketing:boolean,
    sales_advisor_id?: number,
    line1?: string,
    line2?: string,
    postal_code?: string,
    city?: string,
    region?: string,
    referral_code?: string
}