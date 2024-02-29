import { Account } from './../models/Account';
import { AccessToken } from './../models/AccessToken';
import { LoginRequest } from './../requests/LoginRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import moment from 'moment'; 
export class LoginService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    private static isLogged:boolean = false;
    public static async login(request:LoginRequest){
        let json = await this.requester.post(this.links.login(),this.headers,request);
        let expireDate = moment().add(json.success.expires_in,'s').format();
        let accessToken:AccessToken = {
            token:json.success.access_token,
            expire:expireDate
        };
        let refreshToken:string = json.success.refresh_token;
        let secret:string = json.success.secret;
        let account:Account = json.success.account;
        return {
            accessToken:accessToken,
            refreshToken:refreshToken,
            secret:secret,
            account:account
        }
    }
    public static isLoggedIn():boolean{
        return this.isLogged;
    }
    public static setIsLoggedIn(value:boolean){
        this.isLogged = value;
    }
}