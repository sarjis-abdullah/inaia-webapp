import { type Order } from "./Order";

export interface TradeableAmount {
    total_blocked_gram_amount : number,
    tradeable_gram_amount : number,
    blocked_orders : Array<Order>
}