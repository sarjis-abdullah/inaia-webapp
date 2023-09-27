
import { BaseUrls } from "./BaseUrls";
export class Urls{
    private static instance:Urls;
    public static URLS():Urls{
       
        if (!Urls.instance) {
            Urls.instance = new Urls();
        }

        return Urls.instance;
    }
    public getCountries(isCode:Boolean):string{
        return BaseUrls.getCoreUrl() + 'countries'+(isCode?"?order_by=alpha2_code&per_page=500":'?per_page=500');
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
    private buildUrl(baseUrl:string,path:string):string{
        return baseUrl + path;
    }

}