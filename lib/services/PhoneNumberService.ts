import { HttpResponse } from './../utils/HttpResponse';
import { SendPhoneCodeRequest } from '../requests/SendPhoneCodeRequest';
import { VerifyPhonelRequest } from '../requests/VerifyPhoneRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
export class PhoneNumberService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async  validatePhone(language:string,request:VerifyPhonelRequest):Promise<HttpResponse>{
        this.headers.addLocationHeader(language);
        return this.requester.post(this.links.verifyPhoneNumber(),this.headers,request);
    }
    public static async sendPhoneCode(language:string,request:SendPhoneCodeRequest):Promise<HttpResponse>{
        this.headers.addLocationHeader(language);
        return this.requester.post(this.links.sendSmsCode(),this.headers,request);
    }
}