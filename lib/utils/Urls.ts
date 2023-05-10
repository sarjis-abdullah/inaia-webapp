import libConfig from "../lib.config";
import { Envs } from "./Envs";
const ACCOUNT_INCLUDES = "include=person_data,account,address,channels,country,new_inbox_message_count,new_support_ticket_answer_count,products,product_specs,kyc_details";
export class Urls{
    private static instance:Urls;
    
    private coreBaseUrl:string;
    private bankBaseUrl:string;
    private goldDinarBaseUrl : string;
    private paymentsBaseUrl : string;
    private constructor(env?:Envs){
        if(!env)
        {
            env = Envs.staging;
        }
        if(env == Envs.staging){
            this.coreBaseUrl = libConfig.baseUrls.staging.coreBaseUrl;
            this.bankBaseUrl = libConfig.baseUrls.staging.bankBaseUrl;
            this.goldDinarBaseUrl = libConfig.baseUrls.staging.goldDinarBaseUrl;
            this.paymentsBaseUrl = libConfig.baseUrls.staging.paymentsBaseUrl;
        }
        if(env == Envs.production){
            this.coreBaseUrl = libConfig.baseUrls.production.coreBaseUrl;
            this.bankBaseUrl = libConfig.baseUrls.production.bankBaseUrl;
            this.goldDinarBaseUrl = libConfig.baseUrls.production.goldDinarBaseUrl;
            this.paymentsBaseUrl = libConfig.baseUrls.production.paymentsBaseUrl;
        }
    }
    public static URLS(env?:Envs):Urls{
        if (!Urls.instance) {
            Urls.instance = new Urls(env);
        }

        return Urls.instance;
    }
    public getCountries():string{
        return this.coreBaseUrl + 'countries';
    }
    public getPlanUrl(country_id?:Number):string{
        if(country_id)
        {
            return this.coreBaseUrl + `pricing?country_id=${country_id}`;
        }
        else{
            return this.coreBaseUrl + 'pricing';
        }
    }
    public sendEmailCode():string{
        return this.buildUrl(this.coreBaseUrl,'email-code');
    }
    public verifyEmail():string
    {
        return this.buildUrl(this.coreBaseUrl,'verify-email')
    }
    public sendSmsCode():string{
        return this.buildUrl(this.coreBaseUrl,'send-sms');
    }
    public verifyPhoneNumber():string{
        return this.buildUrl(this.coreBaseUrl,'verify-phone');
    }
    public termsAndConditions(country:number,conditionType:string):string{
        return this.buildUrl(this.coreBaseUrl,`conditions?country_id=${country}&condition_type_prerequisite=${conditionType}&per_page=500`)
    }
    public registerCustomer():string{
        return this.buildUrl(this.coreBaseUrl,'register');
    }
    public login():string{
        return this.buildUrl(this.coreBaseUrl,'authenticate?'+ACCOUNT_INCLUDES);
    }
    public getProfileUrl(id:number):string{
        return this.buildUrl(this.coreBaseUrl,`contacts/${id}?${ACCOUNT_INCLUDES}`);
    }
    public getAssetsUrl(accountId:number):string{
        return this.buildUrl(this.goldDinarBaseUrl,`assets/${accountId}`);
    }
    public getLastTransactionUrl(page:number,per_page:number):string{
        return this.buildUrl(this.goldDinarBaseUrl,`orders/account-activities?include=order_transactions,orders_payment_transactions&page=${page}&per_page=${per_page}`);
    }
    private buildUrl(baseUrl:string,path:string):string{
        return baseUrl + path;
    }

}