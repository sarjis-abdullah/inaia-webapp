import { HttpResponse } from './../utils/HttpResponse';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { NewPasswordRequest } from '../requests/NewPasswordRequest';
import { VerifyResetPasswordTokenRequest } from '../requests';
import { objectToQueryString } from '../utils/QueryParamsHelper';


export class ResetPasswordService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async  resetPassword(language:string,request:NewPasswordRequest):Promise<HttpResponse>{
        this.headers.addLocationHeader(language);
        return this.requester.post(this.links.resetPassword(),this.headers,request);
    }
    public static async requestNewPassword(language:string,email:string):Promise<HttpResponse>{
        this.headers.addLocationHeader(language);
        return this.requester.post(this.links.requestPassword(),this.headers,{email:email});
    }
    public static async verifyRestToken(request:VerifyResetPasswordTokenRequest):Promise<HttpResponse>{
        return this.requester.get(this.links.verfiyResetPasswordToken()+'?'+objectToQueryString(request),this.headers);
    }
}