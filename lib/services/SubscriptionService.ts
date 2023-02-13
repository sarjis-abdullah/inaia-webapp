
import { MissingInformationException } from './../exceptions/MissingInformationException';
import { StorageOptions } from './../utils/storage/StorageOptions';
import { AccountInformationRequest } from './../requests/AccountInformationRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { Country } from '../models/country';
import { createStorage } from '../utils/storage/StorageFactory';
import { ChosenPlan } from '../requests/ChosenPlanRequest';
import { StorageKeys } from '../utils/storage/StorageKeys';
import { ConditionRequest } from '../requests/SaveConditionRequest';
import { RegistrationRequest } from '../requests/RegistrationRequest';
export class SubscriptionService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    private static storage =  createStorage(StorageOptions.session);
    private static chosenPlan:ChosenPlan;
    private static accountInformation:AccountInformationRequest;
    private static conditions:string;
    private static allowMarketing:boolean = false;
    public static saveChoosenPlan(request:ChosenPlan):void{
        this.chosenPlan = request;
        this.storage.addItem(StorageKeys.planKey,JSON.stringify(request));
    }
    public static getChosenPlan():ChosenPlan{
        if(!this.chosenPlan)
        {
            let rawChoosenPlan = this.storage.getItem(StorageKeys.planKey);
            if(rawChoosenPlan){
                this.chosenPlan = JSON.parse(rawChoosenPlan);
            }
        }
        return this.chosenPlan;
    }
    public static saveAccountInformation(request:AccountInformationRequest):void{
        this.accountInformation = request;
        this.storage.addItem(StorageKeys.accountInformation,JSON.stringify(request));
    }
    public static  getAccountInformation():AccountInformationRequest{
        if(!this.accountInformation){
            let rawAccountInformation =  this.storage.getItem(StorageKeys.accountInformation);
           if(rawAccountInformation!=null)
            this.accountInformation = JSON.parse(rawAccountInformation);
        }
        return this.accountInformation;
    }
    public static saveConditions(request:ConditionRequest){
        this.conditions = request.conditions;
        this.allowMarketing = request.allow_marketing;
    }
    public  static async registerAccount():Promise<boolean>{
        if(!this.accountInformation){
           let rawAccountInformation =  this.storage.getItem(StorageKeys.accountInformation);
           if(rawAccountInformation!=null)
            this.accountInformation = JSON.parse(rawAccountInformation);
            else{
                throw new MissingInformationException('Missing account information');
            }
        }
        if(!this.chosenPlan){
            let rawChoosenPlan = this.storage.getItem(StorageKeys.planKey);
            if(rawChoosenPlan){
                this.chosenPlan = JSON.parse(rawChoosenPlan);
            }
            else{
                throw new MissingInformationException('Missing product plan');
            }
        }
        if(!this.conditions){
            throw new MissingInformationException("Missing conditions")
        }
        let registrationRequest : RegistrationRequest ={
            prename :this.accountInformation.prename,
            surname : this.accountInformation.surname,
            email:this.accountInformation.email,
            mobile:this.accountInformation.mobile,
            password:this.accountInformation.password,
            plan_id : this.chosenPlan.plan_id,
            country_id:this.chosenPlan.country_id,
            payment_cycle:this.chosenPlan.payment_cycle,
            conditions:this.conditions,
            allow_marketing:this.allowMarketing
        };
        await this.requester.post(this.links.registerCustomer(),this.headers,registrationRequest);
        this.storage.clearAll();
        return true;
    }
}