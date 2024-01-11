import { PaymentAccount } from '../models';
import { AddPaymentAccountRequest } from '../requests/AppPaymentAccountRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';

export class PaymentAccountService {
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getClientPaymentAccounts():Promise<Array<PaymentAccount>>{
        const url = this.links.getClientPaymentAccounts();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let data:PaymentAccount[] = json.data;
        return data;
    }
    public static async setPaymentAccountAsDefault(paymentAccountId:number):Promise<Boolean>{
        const url = this.links.markPaymentAsDefault(paymentAccountId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        await this.requester.put(url,this.headers,{});
        return true
    }
    public static async deletePaymentAccount(paymentAccountId:number):Promise<number>{
        const url = this.links.deletePaymentBankAccount(paymentAccountId);0
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        await this.requester.delete(url,this.headers);
        return paymentAccountId;
    }
    public static async addPaymentAccount(request:AddPaymentAccountRequest):Promise<PaymentAccount>{
        const url = this.links.addPaymentBankAccount();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.post(url,this.headers,request);
        return json.data;
    }
}