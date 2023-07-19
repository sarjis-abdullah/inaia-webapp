import { Envs } from "./Envs";
import libConfig from "../lib.config";
export class BaseUrls {
    private static env = Envs.staging;
    public static setEnv(env:Envs){
        this.env = env;
    }
    public static getCoreUrl() : string{
        if(this.env == Envs.staging){
            return libConfig.baseUrls.staging.coreBaseUrl;
        }
        if(this.env == Envs.production){
            return  libConfig.baseUrls.production.coreBaseUrl;
        }
    }
    public static getGoldDinarUrl() : string{
        if(this.env == Envs.staging){
            
            return libConfig.baseUrls.staging.goldDinarBaseUrl;
            
        }
        if(this.env == Envs.production){
            
            return libConfig.baseUrls.production.goldDinarBaseUrl;
        }
    }
    public static getBankingUrl(){
        if(this.env == Envs.staging){
         
            return libConfig.baseUrls.staging.bankBaseUrl;
        }
        if(this.env == Envs.production){
            
            return libConfig.baseUrls.production.bankBaseUrl;
        }
    }
    public static getPaymentUrl(){
        if(this.env == Envs.staging){
            return libConfig.baseUrls.staging.paymentsBaseUrl;
        }
        if(this.env == Envs.production){
            return libConfig.baseUrls.production.paymentsBaseUrl;
        }
    }
}