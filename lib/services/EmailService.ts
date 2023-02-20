import { HttpResponse } from './../utils/HttpResponse';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { VerifyEmailRequest } from '../requests/VerifyEmailRequest';
import { SendEmailCodeRequest } from '../requests/SendEmailCodeRequest';

export class EmailService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async  validateEmail(request:VerifyEmailRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.verifyEmail(),this.headers,request);
    }
    public static async sendEmailCode(request:SendEmailCodeRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.sendEmailCode(),this.headers,request);
    }
}