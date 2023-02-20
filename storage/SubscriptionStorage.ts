import { AccountInformationRequest } from './../lib/requests/AccountInformationRequest';
import { ChosenPlan } from './../lib/requests/ChosenPlanRequest';
import { StorageKeys } from './StorageKeys';
const verified = 'verified';
export class SubscriptionStorage {
    public static saveStep(step:number){
        sessionStorage.setItem(StorageKeys.subscriptionStep,step.toString());
    }
    public static getStep():number{
        let value = sessionStorage.getItem(StorageKeys.subscriptionStep);
        if(value && !isNaN(value)){
            return parseInt(value);
        }
        else{
            return 1;
        }
    }
    public static saveEmailVerified(){
        sessionStorage.setItem(StorageKeys.emailValidated,verified);
    }
    public static isEmailVerified():boolean{
        let data = sessionStorage.getItem(StorageKeys.emailValidated);
        return data==verified;
    }
    public static phoneValidated() {
        sessionStorage.setItem(StorageKeys.phoneValidated, verified)
    }
    public static isPhoneValidated():boolean {
        let value = sessionStorage.getItem(StorageKeys.phoneValidated);
        return value == verified;
    }
    public static saveChoosenPlan(request: ChosenPlan) {
        sessionStorage.setItem(StorageKeys.planKey, JSON.stringify(request));
    }
    public static getChoosenPlan(): ChosenPlan | null {
        let rawChoosenPlan = sessionStorage.getItem(StorageKeys.planKey);
        let chosenPlan = null;
        if (rawChoosenPlan) {
            chosenPlan = JSON.parse(rawChoosenPlan);
        }
        return chosenPlan;
    }
    public static saveAccountInformation(request: AccountInformationRequest) {
        sessionStorage.setItem(StorageKeys.accountInformation, JSON.stringify(request));
    }
    public static getAccountInformation(): AccountInformationRequest {
        let accountInformation = null;
        let rawAccountInformation = sessionStorage.getItem(StorageKeys.accountInformation);
        if (rawAccountInformation != null)
            accountInformation = JSON.parse(rawAccountInformation);
        return accountInformation;
    }
    public static clearAll(){
        sessionStorage.clear();
    }
}