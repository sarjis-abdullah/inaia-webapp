import {Asset} from './../models/Asset';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
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
}