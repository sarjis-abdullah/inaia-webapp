import { ConfirmationMethod, Order, OrderPreview, PlaceOrderModel, TradeableAmount } from '../models';
import { ConfirmOrderRequest, OrderPreviewRequest, PlaceOrderRequest, TransferAssetRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class AssetTradingService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getOrderPreview(request:OrderPreviewRequest):Promise<OrderPreview>{
        debugger;
        const url = this.links.getOrderPreview();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.post(url,this.headers,request);
        return json;
    }
    public static async placeOrder(request:PlaceOrderRequest):Promise<PlaceOrderModel>{
        const url = this.links.placeOrder();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.post(url,this.headers,request);
        return json.data;
    }
    public static async confirmOrder(request:ConfirmOrderRequest):Promise<Order>{
        const url = this.links.confirmOrder();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.post(url,this.headers,request);
        return json.data;
    }
    public static async getPendingTradings():Promise<Array<PlaceOrderModel>>{
        const url = this.links.getPendingApprovals();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.get(url,this.headers);
        return json.data;
    }
    public static async getConfirmationMethods():Promise<Array<ConfirmationMethod>>{
        const url = this.links.getConfirmationMethods();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.get(url,this.headers);
        return json.data;
    }
    public static async getTradeableAmount(depotID:number):Promise<TradeableAmount>{
        const url = this.links.getTradableAmount(depotID);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.get(url,this.headers);
        return json;
    }
    public static async transferOrder(request:TransferAssetRequest):Promise<PlaceOrderModel>{
        const url = this.links.transferAsset();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json= await this.requester.post(url,this.headers,request);
        return json.data;
    }
}