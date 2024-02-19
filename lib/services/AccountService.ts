import { Account } from './../models/Account';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { Address, ProductFee } from '../models';
import { ChannelRequest, UpdateAddressRequest } from '../requests';
import { SettingRequest } from '../requests/SettingRequest';
import { LocaleSettingRequest, PasswordUpdateRequest } from '../requests';
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
    public static async updateChannel(channel:ChannelRequest):Promise<Boolean>{
        try{
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            if(channel.id)
                await this.requester.put(this.links.updateChannel(channel.id),this.headers,channel);
            else{
                await this.requester.post(this.links.updateChannel(),this.headers,channel);
            }
            return true;
        }
        catch(err){
            throw err;
        }
    }
    public static async updateSettings(accountId:number,setting:LocaleSettingRequest):Promise<any>{
        try{
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            let data = await this.requester.put(this.links.updateSettings(accountId),this.headers,setting);
            return data.data;
        }
        catch(err){
            throw err;
        }
    }
    public static async updatePassword(payload:PasswordUpdateRequest):Promise<any>{
        try{
            const url = this.links.updatePassword();
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            const json = await this.requester.post(url,this.headers, payload);
            return json.data;
        }
        catch(err){
            throw err;
        }
    }
}