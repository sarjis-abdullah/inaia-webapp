
import { HistoricalPrice } from '../models';
import { PriceVariationRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class PricesHistoryService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();

    public static async getGoldPriceVariationData(request:PriceVariationRequest):Promise<HistoricalPrice[]>{
        const url = this.links.getGoldPriceVariationData(request.period,request.currency);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response : HistoricalPrice[] = json.data.reverse();
        return response;
    }
    public static async getSilverPriceVariationData(request:PriceVariationRequest):Promise<HistoricalPrice[]>{
        const url = this.links.getSilverPriceVariationData(request.period,request.currency);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response : HistoricalPrice[] = json.data.reverse();
        return response;
    }
}
