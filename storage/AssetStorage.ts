import { AssetsService } from "@/lib/services";
import { StorageKeys } from "./StorageKeys";
import moment from "moment";
import { PriceResponse } from "~~/lib/responses";
import { DepotType } from "~~/lib/models";

export class AssetStorage {
    
    public static async getGoldPrice() : Promise<number>{
        const goldPriceString = localStorage.getItem(StorageKeys.goldPrice);
        if(!goldPriceString){
            const goldPrice : PriceResponse= await AssetsService.getCurrentGoldPrice();
            localStorage.setItem(StorageKeys.goldPrice,JSON.stringify(goldPrice));
            return goldPrice.fixing_gram;
        }
        else{
            const goldPriceObj : PriceResponse = JSON.parse(goldPriceString);
            const lastUpdate = moment(goldPriceObj.lastUpdate)
            if(moment().isSame(lastUpdate,'h')){
                return goldPriceObj.fixing_gram;
            }else{
                const goldPrice : PriceResponse= await AssetsService.getCurrentGoldPrice();
                localStorage.setItem(StorageKeys.goldPrice,JSON.stringify(goldPrice));
                return goldPrice.fixing_gram;
            }
        }
    }
    public static async getSilverPrice() : Promise<number>{
        const silverPriceString = localStorage.getItem(StorageKeys.silverPrice);
        if(!silverPriceString){
            const silverPrice : PriceResponse= await AssetsService.getCurrentSilverPrice();
            localStorage.setItem(StorageKeys.silverPrice,JSON.stringify(silverPrice));
            return silverPrice.fixing_gram;
        }
        else{
            const silverPriceObj : PriceResponse = JSON.parse(silverPriceString);
            const lastUpdate = moment(silverPriceObj.lastUpdate)
            if(moment().isSame(lastUpdate,'h')){
                return silverPriceObj.fixing_gram;
            }else{
                const silverPrice : PriceResponse= await AssetsService.getCurrentSilverPrice();
                localStorage.setItem(StorageKeys.silverPrice,JSON.stringify(silverPrice));
                return silverPrice.fixing_gram;
            }
        }
    }
    public static saveDepotTypes(depotTypes:DepotType[]){
        sessionStorage.setItem(StorageKeys.depotTypes,JSON.stringify(depotTypes));
    }
    public static async getDepotTypes() : Promise<DepotType[]>{
        const types = sessionStorage.getItem(StorageKeys.depotTypes);
        if(types)
            return JSON.parse(types);
        else{
            const types = await AssetsService.getDepotTypes();
            sessionStorage.setItem(StorageKeys.depotTypes,JSON.stringify(types))
            return types;
        }
        return [];
    }

}