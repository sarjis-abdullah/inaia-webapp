import { HttpResponse } from './../utils/HttpResponse';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { ResetPinRequest } from '../requests/ResetPinRequest';
export class ResetPinService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async  resetPin(language:string,request:ResetPinRequest):Promise<HttpResponse>{
        this.headers.addLocationHeader(language);
        return this.requester.post(this.links.resetPin(),this.headers,request);
    }
}