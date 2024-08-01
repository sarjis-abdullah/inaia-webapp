
import { appNames } from "../appNames";
export class ConditionCountryIds {
    private static appName = appNames.inaiaEu
    public static setAppName(name:appNames){
        this.appName = name;
    }
    public static getCountryId(){
        if(this.appName == appNames.inaiaUk){
            return 233;
        }
        else{
            return 82;
        }
    }
}