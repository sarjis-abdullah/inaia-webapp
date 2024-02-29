import { HttpResponse } from './../utils/HttpResponse';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { DepotTarget } from '../models';
import { TokenService } from './TokenService';
export class SavingPlanService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getSavinPlansTargets():Promise<DepotTarget[]>{
        const url = this.links.getSavingPlanTarget();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let data:DepotTarget[] = json.data;
        return data;
    }
}