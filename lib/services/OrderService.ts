import { OrderStatuses } from './../contants/OrderStatuses';
import { PaginationResponse } from '../responses/PaginationResponse';
import { Order } from '../models/Order';
import { PageRequest } from '../requests/PageRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { OrderTypes } from '../contants';
import { OrderTransaction } from '../models';
export class OrderService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getLastestOrders(request:PageRequest):Promise<PaginationResponse<Order>>{
        const url = this.links.getLastTransactionUrl(request.page,request.perPage);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<Order> = {
            data:json.data,
            currentPage:json.current_page,
            lastPage:json.last_page,
            total:json.total
        };
        return response;
    }
    public static async getDepotOrders(depot_id:number,request:PageRequest){
        const url = this.links.getDepotOrders(depot_id,request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<Order> = {
            data:json.data,
            currentPage:json.meta.current_page,
            lastPage:json.meta.last_page,
            total:json.meta.total
        };
        return response;
    }
    public static getExecutionDate(order:Order):Date{
        if(order && order.transactions && order.transactions.length > 0){
            const lastTrans = order.transactions[order.transactions.length-1];
            if(lastTrans && lastTrans.gram_price_date){
                return new Date(lastTrans.gram_price_date);
            }
        }
        return new Date(order.updated_at);
        
    }
    public static getGramAmountOfAnOrder(order:Order):number | null | undefined{
        if(
            order.order_type.name_translation_key == OrderTypes.gold_purchase ||
            order.order_type.name_translation_key == OrderTypes.silver_purchase ||
            order.order_type.name_translation_key == OrderTypes.silver_purchase_interval ||
            order.order_type.name_translation_key == OrderTypes.gold_purchase_interval
            ){
                if(order && order.transactions && order.transactions.length > 0){
                    const lastTrans = this.getTheRightTransaction(order);
                    if(lastTrans){
                        return lastTrans.gram_amount;
                    }
                }
            }
            else if (
                order.order_type.name_translation_key == OrderTypes.gold_sale ||
                order.order_type.name_translation_key == OrderTypes.gold_sell ||
                order.order_type.name_translation_key == OrderTypes.gold_gift ||
                order.order_type.name_translation_key == OrderTypes.gold_delivery ||
                order.order_type.name_translation_key == OrderTypes.silver_sell ||
                order.order_type.name_translation_key == OrderTypes.silver_gift ||
                order.order_type.name_translation_key == OrderTypes.silver_delivery ||
                order.order_type.name_translation_key == OrderTypes.gold_transfer_in ||
                order.order_type.name_translation_key == OrderTypes.gold_transfer_out ||
                order.order_type.name_translation_key == OrderTypes.silver_transfer_in ||
                order.order_type.name_translation_key == OrderTypes.silver_transfer_out ||
                order.order_type.name_translation_key == OrderTypes.gold_withdrawal ||
                order.order_type.name_translation_key == OrderTypes.silver_withdrawal

            ){
                return order.amount;
            }
            return null;
    }
    public static getMoneyAmountOfAnOrder(order?:Order):number | null | undefined{
        if(order){
            if(order.order_status?.name_translation_key == OrderStatuses.completed){
                if(
                    order.order_type.name_translation_key == OrderTypes.gold_purchase_interval ||
                    order.order_type.name_translation_key == OrderTypes.silver_purchase_interval
                    
                    ){
                        return order.purchase_amount;
                    }
                    else{
                        const lastTrans = this.getTheRightTransaction(order);
                        if(lastTrans){
                            return lastTrans.money_amount;
                        }
                    }
            }
            else{
                if(
                    order.order_type.name_translation_key == OrderTypes.gold_purchase ||
                    order.order_type.name_translation_key == OrderTypes.silver_purchase ||
                    order.order_type.name_translation_key == OrderTypes.silver_purchase_interval ||
                    order.order_type.name_translation_key == OrderTypes.gold_purchase_interval
                    
                    ){
                        return order.amount
                    }
                    else
                    return null;
            }
        }
        return null;
    }
    public static getTheOrderTransactionCourse(order?:Order):number | undefined {
        const transaction = this.getTheRightTransaction(order);
        if(transaction){
            return transaction.gram_price_trading;
        }
        else
        {
            return undefined;
        }
    }
    public static getTransactionFee(order?:Order):number | undefined | null{
        if(order){
            if(
                order.order_status && 
                order.order_type.name_translation_key.includes('interval') && 
                order.order_status.name_translation_key == OrderStatuses.completed &&
                order.agio_amount > 0
                )
            {
                return order.agio_amount;
            }
            const lastTrans = this.getTheRightTransaction(order);
            if(lastTrans){
                return lastTrans.fee;
            }
            
        }
        return null;
    }
    public static getStorageFee(order?:Order):number | undefined | null{
        if(order){
            if(
                order.order_status && 
                order.order_type.name_translation_key.includes('interval') && 
                order.order_status.name_translation_key == OrderStatuses.completed &&
                order.storage_fee > 0
                )
            {
                return order.storage_fee;
            }
            
        }
        return null;
    }
    public static getPaymentMethodName(order?:Order):string | null | undefined {
        if(order){
            if(order.orders_payment_transactions && order.orders_payment_transactions.length > 0){
                const paymentTransaction = order.orders_payment_transactions[order.orders_payment_transactions.length-1];
                if(paymentTransaction){
                    return paymentTransaction.payment_method;
                }
            }
        }
        return null;
    }
    private static getTheRightTransaction(order?:Order):OrderTransaction | null{
        if(order && order.transactions && order.transactions.length > 0){
           if(order.order_status?.name_translation_key  == OrderStatuses.refunded && order.transactions.length >=2){
            return order.transactions[1]
           }
           else{
            return order.transactions[0];
           }
            
        }
        return null;
    }
}