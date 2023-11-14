import { ConditionTypes } from './../contants/ConditionTypes';
import { Condition } from './../models/Condition';
import { ConditionsRequest } from './../requests/ConditionsRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
export class ConditionService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getSubscriptionConditions(language:string,request:ConditionsRequest):Promise<Array<Condition>>{
        this.headers.addLocationHeader(language);
        let res = await this.requester.get(this.links.termsAndConditions(ConditionTypes.registration,request.countryId),this.headers);
        let data:Array<Condition> = [];
        for (const [key, value] of Object.entries(res.data)) {
            data = data.concat(value);
        }
        data.push({
            id:-1,
            title:'accept_email'
        })
        return data;
    }
    public static async getDepotAndSavingPlanCondition(request:ConditionsRequest):Promise<Array<Condition>>{
        
        let res = await this.requester.get(this.links.termsAndConditions(request.type,null),this.headers);
        let data:Array<Condition> = [];
        for (const [key, value] of Object.entries(res.data)) {
            data = data.concat(value);
        }
        return data;
    }
}