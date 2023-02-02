import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { Plan } from '../models/Plan';
export class PlanService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getPlansDetails(country_id:Number):Promise<Array<Plan>>{
        let res = await this.requester.get(this.links.getPlanUrl(country_id),this.headers);
        let json = await res.json();
        let rawData = json.data;
        let data:Array<Plan>=[];
        Object.values(rawData).forEach((prod)=>data.push(prod));
        return data;
    }
}