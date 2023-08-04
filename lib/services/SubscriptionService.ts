
import { MissingInformationException } from './../exceptions/MissingInformationException';
import { AccountInformationRequest } from './../requests/AccountInformationRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { ChosenPlan } from '../requests/ChosenPlanRequest';
import { ConditionRequest } from '../requests/SaveConditionRequest';
import { RegistrationRequest } from '../requests/RegistrationRequest';
import { AddressRequest } from '../requests/AddressRequest';
export class SubscriptionService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    private static chosenPlan:ChosenPlan;
    private static accountInformation:AccountInformationRequest;
    private static address:AddressRequest;
    private static conditions:string;
    private static allowMarketing:boolean = false;
    public static saveChoosenPlan(request:ChosenPlan):void{
        this.chosenPlan = request;
    }
    public static getChosenPlan():ChosenPlan{
        return this.chosenPlan;
    }
    public static saveAccountInformation(request:AccountInformationRequest):void{
        this.accountInformation = request;
    }
    public static  getAccountInformation():AccountInformationRequest{
        return this.accountInformation;
    }
    public static saveAddress(request:AddressRequest):void{
        this.address = request;
    }
    public static  getAddress():AddressRequest{
        return this.address;
    }
    public static saveConditions(request:ConditionRequest){
        this.conditions = request.conditions;
        this.allowMarketing = request.allow_marketing;
    }
    public  static async registerAccount(langauage:string):Promise<boolean>{
        if(!this.accountInformation){
           throw new MissingInformationException('Missing account information');
        }
        if(!this.conditions){
            throw new MissingInformationException("Missing conditions")
        }
        if(!this.address || this.address.country_id ==-1){
            throw new MissingInformationException("Missing country")
        }
        let registrationRequest : RegistrationRequest ={
            prename :this.accountInformation.prename,
            surname : this.accountInformation.surname,
            email:this.accountInformation.email,
            mobile:this.accountInformation.phone_code+this.accountInformation.mobile,
            password:this.accountInformation.password,
            //plan_id : this.chosenPlan.plan_id,
            
            //payment_cycle:this.chosenPlan.payment_cycle,
            conditions:this.conditions,
            allow_marketing:this.allowMarketing,
            referral_code:this.accountInformation.referral_code?this.accountInformation.referral_code:undefined
        };
        if(this.address){
            registrationRequest.country_id=this.address.country_id,
            registrationRequest.line1 = this.address.line1;
            registrationRequest.line2 = this.address.line2?this.address.line2:undefined;
            registrationRequest.postal_code = this.address.postal_code;
            registrationRequest.city = this.address.city;
            registrationRequest.region = this.address.region;
        }
        this.headers.addLocationHeader(langauage);
        await this.requester.post(this.links.registerCustomer(),this.headers,registrationRequest);
        //console.log(registrationRequest);
        return true;
    }
}