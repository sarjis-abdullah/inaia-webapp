import Cookies from 'js-cookie';
import { StorageKeys } from './StorageKeys';
import { Account } from './../lib/models/Account';
import moment from 'moment';
export class AccountStorage{
    public static saveAccount(account:Account){
        sessionStorage.setItem(StorageKeys.account,JSON.stringify(account));
    }
    public static getAccount():Account | null{
        const data = sessionStorage.getItem(StorageKeys.account);
        if(data)
            return JSON.parse(data);
        else
            return null;
    }
    public static saveAccountId(id:number,expDate:string){
        this.saveInCookie(StorageKeys.accountId,id.toString(),expDate);
    }
    public static getAccountId():number | null{
        let id = Cookies.get(StorageKeys.accountId);
        return parseInt(id);
    }
    
    public static saveContactId(id:number,expDate:string){
        this.saveInCookie(StorageKeys.contact_id,id.toString(),expDate);
    }
    public static getContactId():number | null{
        let id = Cookies.get(StorageKeys.contact_id);
        return parseInt(id);
    }
    public static clearStorage(){
        window.sessionStorage.removeItem(StorageKeys.account);
        Cookies.remove(StorageKeys.accountId);
        Cookies.remove(StorageKeys.contact_id);
    }
    private static saveInCookie(key:string,data:string,expDate:string){
        const now = moment();
        const expirationDate = moment(expDate);
        const expire = expirationDate.diff(now,'days');
        Cookies.set(key,data,{expires:expire});
    }
    
}