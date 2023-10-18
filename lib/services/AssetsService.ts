import { Depot } from './../models/Depot';
import { PaginationResponse } from './../responses/PaginationResponse';
import { GetClientDepotsRequest } from './../requests/GetClientDepotsRequest';
import {Asset} from './../models/Asset';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { CurrencyService } from './CurrencyService';
import { PriceResponse } from '../responses/PriceResponse';
import { DepotType } from '../models';
import { DepotHistoryValuesRequest } from '../requests';
import { DepotHistoryValue } from '../models';
import moment from 'moment';
export class AssetsService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getAssets(accountId:number):Promise<Asset[]>{
        
        const url = this.links.getAssetsUrl(accountId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let data:Asset[] = json.data;
        return data;
    }
    public static async getTheDepotsOfTheClient(request:GetClientDepotsRequest):Promise<PaginationResponse<Depot>>{
        const url = this.links.getDepotListUrl(request.depot_type_id,request.page,request.perPage);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response: PaginationResponse<Depot> = {
            currentPage: json.meta.current_page,
            data:json.data,
            lastPage:json.meta.last_page
        }
        return response;
    }
    public static async getCurrentGoldPrice() : Promise<PriceResponse>{
        const currency = CurrencyService.getCurrencyCode();
        const url = this.links.getGoldPrice(currency);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response : PriceResponse = json.data;
        response.lastUpdate = new Date().toISOString();
        return json.data;
    }
    public static async getCurrentSilverPrice() : Promise<PriceResponse>{
        const currency = CurrencyService.getCurrencyCode();
        const url = this.links.getSilverPrice(currency);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response : PriceResponse = json.data;
        response.lastUpdate = new Date().toISOString();
        return json.data;
    }
    public static async getDepotTypes():Promise<DepotType[]>{
        const url = this.links.getDepotTypesUrl();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        return json.data;
    }
    public static async getDepotDetails(id:number):Promise<Depot>{
        const url = this.links.depotDetail(id);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        return json.data;
    }
    public static async getDepotHistoryValues(request:DepotHistoryValuesRequest):Promise<DepotHistoryValue[]>{
        const url = this.links.depotHistoryValue(request.depot_id,request.period);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let data:DepotHistoryValue[] = [];
        for (const [key, value] of Object.entries(json)) {
            let date = moment.unix(parseInt(key)).toString();
            let item = data.find(x=>x.date==date);
            if(item)
            {
                item.money_value = value.EUR;
                item.gram_value=value.gold;
            }
            else
            {
                data.push({date:date,money_value:value.EUR,gram_value:value.gram});
            }
        }
        if(data.length==1)
        {
            data.push({
                date:moment().toString(),
                money_value:data[0].money_value,
                gram_value:data[0].gram_value
            })
        }
        return data;
    }
}