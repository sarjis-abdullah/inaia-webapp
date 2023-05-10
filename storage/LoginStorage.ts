import { AccessToken } from './../lib/models/AccessToken';
import { StorageKeys } from './StorageKeys';
import Cookies from 'js-cookie'; 
import moment from 'moment';
export class LoginStorage{
    public static saveToken(token:AccessToken,permanent:boolean){
       
        let expire = 1;
        if(permanent)
        {
            const now = moment();
            const expirationDate = moment(token.expire);
            expire = expirationDate.diff(now,'days');
            console.log(expire);
            localStorage.setItem(StorageKeys.expirationDate,token.expire)
        }
        Cookies.set(StorageKeys.token,token.token,{expires:expire});
    }
    public static getExpDate():string | null{
        return localStorage.getItem(StorageKeys.expirationDate)
    }
    public static saveRefreshToken(token:string){
        localStorage.setItem(StorageKeys.refreshToken,token);
    }
    public static saveSecret(secret?:string){
        if(secret)
        localStorage.setItem(StorageKeys.secret,secret);
    }
    public static getToken():string | undefined | null{
        return Cookies.get(StorageKeys.token);
    }
}