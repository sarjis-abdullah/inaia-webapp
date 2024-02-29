import { Currencies } from './../contants';

export class CurrencyService{
    private static currency = Currencies[0];
    public static setCurrency(){
        
    }
    public static getCurrency(){
        return this.currency;
    }
    public static getCurrencySymbol() : string{
        return this.currency.symbol;
    }
    public static getCurrencyCode() : string {
        return this.currency.code;
    }
    public static getCurrencyName() : string {
        return this.currency.name;
    }
}