export interface TransferAssetRequest{
    source_depot_id:number,
    destination_depot_id:number,
    account_id:number,
    gram_amount:number,
    order_approval_method:string
}