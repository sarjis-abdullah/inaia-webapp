import { Account } from './../models/Account';
export class AccountService{
    private static account:Account;
    public static setAccount(account:Account){
        this.account = account;
    }
    public static getAccount():Account{
        return this.account;
    }
}