import { Envs } from "./Envs";
import libConfig from "../lib.config";
import { appNames } from "../appNames";
export class BaseUrls {
    private static env = Envs.staging;
    private static appName = appNames.inaiaEu
    public static setEnv(env:Envs){
        this.env = env;
    }
    public static setAppName(name:appNames){
        this.appName = name;
    }
    public static getCoreUrl() : string{
        const app = libConfig.baseUrls[this.appName]
        return app[this.env].coreBaseUrl;
    }
    public static getGoldDinarUrl() : string{
        const app = libConfig.baseUrls[this.appName]
        return app[this.env].goldDinarBaseUrl;
    }
    public static getBankingUrl(){
        const app = libConfig.baseUrls[this.appName]
        return app[this.env].bankBaseUrl;
    }
    public static getPaymentUrl() : string{
        const app = libConfig.baseUrls[this.appName]
        return app[this.env].paymentsBaseUrl;
    }
}