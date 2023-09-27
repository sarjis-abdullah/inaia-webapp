
import { PricePeriods } from "../contants";
import { BaseUrls } from "./BaseUrls";
const ACCOUNT_INCLUDES = "include=person_data,account,address,channels,country,new_inbox_message_count,new_support_ticket_answer_count,products,product_specs,kyc_details";
const DEPOT_INCLUDES = "depot_status,depot_status_history,depot_orders,depot_agio_transactions,account,interval";
export class Urls{
    private static instance:Urls;
    public static URLS():Urls{
       
        if (!Urls.instance) {
            Urls.instance = new Urls();
        }

        return Urls.instance;
    }
    public getCountries():string{
        return BaseUrls.getCoreUrl() + 'countries';
    }
    public getPlanUrl(country_id?:Number):string{
        if(country_id)
        {
            return BaseUrls.getCoreUrl() + `pricing?country_id=${country_id}`;
        }
        else{
            return BaseUrls.getCoreUrl() + 'pricing';
        }
    }
    public sendEmailCode():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'email-code');
    }
    public verifyEmail():string
    {
        return this.buildUrl(BaseUrls.getCoreUrl(),'verify-email')
    }
    public sendSmsCode():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'send-sms');
    }
    public verifyPhoneNumber():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'verify-phone');
    }
    public termsAndConditions(country:number,conditionType:string):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`conditions?country_id=${country}&condition_type_prerequisite=${conditionType}&per_page=500`)
    }
    public registerCustomer():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'register');
    }
    public resetPassword():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'password-reset/apply');
    }
    public resetPin():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'accounts/pin-reset');
    }
    public login():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'authenticate?'+ACCOUNT_INCLUDES);
    }
    public getProfileUrl(id:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`contacts/${id}?${ACCOUNT_INCLUDES}`);
    }
    public getAssetsUrl(accountId:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`assets/${accountId}`);
    }
    public getLastTransactionUrl(page:number,per_page:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`orders/account-activities?include=order_transactions,orders_payment_transactions&page=${page}&per_page=${per_page}`);
    }
    public getDepotListUrl(depotTypeId?:number,page:number = 1,perPage:number = 100):string{
        let url =  `depots/account-depots?include=${DEPOT_INCLUDES}&page=${page}&per_page=${perPage}`;
        if(depotTypeId){
            url += `&depot_type_id=${depotTypeId}`;
        }
        return  this.buildUrl(BaseUrls.getGoldDinarUrl(),url);
    }
    public getGoldPrice(currency:string):string {
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'current-gold-price?currency='+currency);
    }
    public getSilverPrice(currency:string):string {
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'current-silver-price?currency='+currency);
    }
    public getDepotTypesUrl(){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'depot-types');
    }
    public getGoldPriceVariationData(period:string,currency:string){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`historical-price?type=${period}&currency=${currency}`);
    }
    public getSilverPriceVariationData(period:string,currency:string){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`silver-price-historical?period=${period}&currency=${currency}`);
    }
    private buildUrl(baseUrl:string,path:string):string{
        return baseUrl + path;
    }

}