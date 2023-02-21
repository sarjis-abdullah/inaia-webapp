import { StorageKeys } from './StorageKeys';
import { Account } from './../lib/models/Account';
export class AccountStorage{
    public static saveAccount(account:Account,permanent:boolean){
        if(permanent){
            localStorage.setItem(StorageKeys.account,JSON.stringify(account))
        }
        else{
            sessionStorage.setItem(StorageKeys.account,JSON.stringify(account))
        }
    }
}