import { Account } from './../models/Account';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { Address, ProductFee } from '../models';
import { UpdateAddressRequest } from '../requests';
export class AccountService{
    private static account:Account;
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async loadAccount(id:number):Promise<Account>{
        try{
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            let json = await this.requester.get(this.links.getProfileUrl(id),this.headers);
            let account:Account = json.data.customer;
            this.setAccount(account);
            return account;
        }
        catch(err){
            throw err;
        }
    }
    public static setAccount(account:Account){
                this.account = account;
    }
    public static async getAccount(id:number):Promise<Account>{
        if(this.account){
            return this.account;
        }
        else{
            return this.loadAccount(id);
        }
        
    }
    public static async getAccountProductDetails(account_id:number):Promise<ProductFee[]>{
        try{
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            let json = await this.requester.get(this.links.accountPorductDetails(account_id),this.headers);
            return json.data;
        }
        catch(err){
            throw err;
        }
    }
    public static async updateAddress(address:UpdateAddressRequest):Promise<Address>{
        try{
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            let json = await this.requester.put(this.links.updateAddress(address.id),this.headers,address);
            this.account.address = json.data;
            return json.data;
        }
        catch(err){
            throw err;
        }
    }
}