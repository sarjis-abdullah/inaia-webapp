export interface AddPaymentAccountRequest{
    payment_method:string,
    account_id:number,
    is_default:boolean,
    iban:string,
    account_holder:string,
    confirmation_checked:boolean
}