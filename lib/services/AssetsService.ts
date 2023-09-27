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
}