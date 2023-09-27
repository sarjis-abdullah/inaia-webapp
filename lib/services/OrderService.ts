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
            lastPage:json.last_page
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
                order.order_type.name_translation_key == OrderTypes.silver_delivery
            ){
                return order.amount;
            }
            return null;
    }
    public static getMoneyAmountOfAnOrder(order:Order):number | null{
        if(order.order_status?.name_translation_key == OrderStatuses.completed){
            if(
                order.order_type.name_translation_key == OrderTypes.gold_purchase ||
                order.order_type.name_translation_key == OrderTypes.silver_purchase
                
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
        return null;
    }
    private static getTheRightTransaction(order:Order):OrderTransaction | null{
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