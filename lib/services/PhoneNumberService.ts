import { StorageKeys } from './../utils/storage/StorageKeys';
import { HttpResponse } from './../utils/HttpResponse';
import { SendPhoneCodeRequest } from '../requests/SendPhoneCodeRequest';
import { VerifyPhonelRequest } from '../requests/VerifyPhoneRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { createStorage } from '../utils/storage/StorageFactory';
import { StorageOptions } from './../utils/storage/StorageOptions';
export class PhoneNumberService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    private static storage =  createStorage(StorageOptions.session);
    public static async  validatePhone(request:VerifyPhonelRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.verifyPhoneNumber(),this.headers,request);
    }
    public static async sendPhoneCode(request:SendPhoneCodeRequest):Promise<HttpResponse>{
        return this.requester.post(this.links.sendSmsCode(),this.headers,request);
    }
    public static phoneValidated(){
        this.storage.addItem(StorageKeys.phoneValidated,'validated');
    }
    public static isPhoneValidated(){
        let value = this.storage.getItem(StorageKeys.phoneValidated);
        return value && value == 'validated';
    }
}