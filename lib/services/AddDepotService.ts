import { AgioPaymentsModels } from '../contants/AgioPaymentsModels';
import { AgioPaymentsPercentages } from '../contants';
import { DataItem, SpPerformanceData } from '../models';
import { AddDepotRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';

export class AddDepotService {
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async saveTheDepot(request:AddDepotRequest):Promise<any>{
        const url = this.links.addDepot();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let res = await this.requester.post(url,this.headers,request);
        return res;
    }
    public static calculateChartData(nbrOfYears:number,monthlySavings:number,returnsPercentage:number,totalAgio:number,agioPaymentModel:AgioPaymentsModels):SpPerformanceData{
        let data : SpPerformanceData = {savingsData:[],agioData:[],};
        let agioPaymentPercentage = AgioPaymentsPercentages.SeventyFive;
        let agioData : DataItem[] = [];
        if(agioPaymentModel == AgioPaymentsModels.onetime){
            agioData.push({
                year:1,
                value:totalAgio
            })
        }
        else{
            let yearlyPayment = ((monthlySavings*12)/100)*agioPaymentPercentage;
            let numOfYear = Math.ceil(totalAgio/(yearlyPayment));
            for (let index = 1; index <= numOfYear; index++) {
               
                
                let  payed = yearlyPayment*(index);
               
                let rest = totalAgio - payed;
                if(rest>yearlyPayment)
                {
                    agioData.push({year:index,value:yearlyPayment})
                }
                else
                {
                    agioData.push({year:index,value:rest})
                }
            }
        }
        data.agioData = agioData;
        let savingData : DataItem[] = [];
        for (let index = 1; index <= nbrOfYears; index++) {
            
            let prev = 0;
            if(index>1)
                prev = savingData[index-2].value;
           
            const element = {year:index,value:monthlySavings*12+prev}
            savingData.push(element);
        }
        
        data.savingsData = savingData;
        let returnsData  : DataItem[] = [];
        for (let index = 1; index <= nbrOfYears; index++) {
            let prev = 0;
            if(index>1)
                prev = returnsData[index-2].value;
            
            let brute = monthlySavings*12+prev;
            if(index<=agioData.length+1)
            {
                brute = brute - agioData[index-1].value;
            }
            const returns = brute + (brute/100)*returnsPercentage;
            const element = {year:index,value:returns}
            returnsData.push(element);
        }
        data.returnsData = returnsData;
        return data;
    }
    public static calculateTotalAgio(agioPerTransaction:number,reduction:number,numberOfYears:number,monthlySaving:number):number{
        let totalAgio = ((monthlySaving/100)*agioPerTransaction)*12*numberOfYears;
        totalAgio = totalAgio - (totalAgio/100)*reduction;
        return totalAgio;
    }
}