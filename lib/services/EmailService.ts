import { StorageKeys } from './../utils/storage/StorageKeys';
import { HttpResponse } from './../utils/HttpResponse';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { VerifyEmailRequest } from '../requests/VerifyEmailRequest';
import { SendEmailCodeRequest } from '../requests/SendEmailCodeRequest';
import { createStorage } from '../utils/storage/StorageFactory';
import { StorageOptions } from './../utils/storage/StorageOptions';
export class EmailService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    private static storage =  createStorage(StorageOptions.session);
    public static async  validateEmail(request:VerifyEmailRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.verifyEmail(),this.headers,request);
    }
    public static async sendEmailCode(request:SendEmailCodeRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.sendEmailCode(),this.headers,request);
    }
    public static emailValidated(){
        this.storage.addItem(StorageKeys.emailValidated,'validated');
    }
    public static isEmailValidated(){
        let value = this.storage.getItem(StorageKeys.emailValidated);
        return value && value == 'validated';
    }
}