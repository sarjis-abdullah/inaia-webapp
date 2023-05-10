export interface OrderPaymentTransaction{
    created_at?:string,
    deleted_at?:string,
    id:number,
    order_id?:number,
    payment_method?: string,
    payment_transaction_id:number,
    updated_at?:string
}