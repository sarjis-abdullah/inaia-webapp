import libConfig from "../lib.config";
import { Envs } from "./Envs";
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

}