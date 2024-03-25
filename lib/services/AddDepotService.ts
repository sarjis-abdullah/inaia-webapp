import { AgioPaymentsModels } from '../contants/AgioPaymentsModels';
import { AgioPaymentsPercentages, MINIMUM_PERIOD_TO_START_SAVING_PLAN, SavingPlanPaymentIntervals } from '../contants';
import { DataItem, Depot, NextPossibleDate, SavingsPlanPaymentInterval, SpPerformanceData } from '../models';
import { AddDepotRequest, AddSavingsPlanRequest, UpdateDepotRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import moment from 'moment';

export class AddDepotService {
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async saveTheDepot(request:AddDepotRequest):Promise<any>{
        const url = this.links.addDepot();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        if(request.interval_amount){
            const intervalIds = await this.getIntervalIds();
            intervalIds.forEach(interval=>{
                if(interval.name_translation_key == SavingPlanPaymentIntervals.interval_monthly){
                    request.interval_id = interval.id;
                }
            })
        }
        let res = await this.requester.post(url,this.headers,request);
        return res;
    }
    public static async saveTheSavingPlan(depotId:number,request:AddSavingsPlanRequest):Promise<any>{
        const url = this.links.addSavingPlan(depotId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        if(request.interval_amount){
            const intervalIds = await this.getIntervalIds();
            intervalIds.forEach(interval=>{
                if(interval.name_translation_key == SavingPlanPaymentIntervals.interval_monthly){
                    request.interval_id = interval.id;
                }
            })
        }
        let res = await this.requester.put(url,this.headers,request);
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
            let yearlyPayment = ((monthlySavings/100)*agioPaymentPercentage)*12;
            let numOfYear = Math.ceil(totalAgio/(yearlyPayment));
            for (let index = 1; index <= numOfYear; index++) {
                
                    let  payed = yearlyPayment*(index-1);
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
            if(index<=agioData.length && agioPaymentModel != AgioPaymentsModels.onetime)
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
    public static calculateNextPossibleDates():NextPossibleDate{
        const nextMinimumPossibleDate = moment().add(MINIMUM_PERIOD_TO_START_SAVING_PLAN,'day');
        const dayOfTheMonth = nextMinimumPossibleDate.date();
        let nextPossibleDay = 15;
        let nextPossibleMonth = nextMinimumPossibleDate.month();
        if(dayOfTheMonth>=15)
        {
            nextPossibleDay = 1;
            nextPossibleMonth++;
        }
        const nextPossibleYear = nextMinimumPossibleDate.year();
        return {nextPossibleDay,nextPossibleMonth,nextPossibleYear}
    }
    public static calculateAgioTableData(monthlySavings:number,totalAgio:number):Array<any>{
        let agioTableData : [] = [];
        let agioPaymentPercentage = AgioPaymentsPercentages.SeventyFive;
       
        let payed = 0;
        let month = 1;
        while(payed<totalAgio)
        {
           
            let rest = totalAgio-payed;
            let element = {}
            const monthlyAgioPayment = (monthlySavings/100)*agioPaymentPercentage
            if(rest>monthlyAgioPayment)
            {
                element = {month:month,saving:monthlySavings,agio:monthlyAgioPayment,assetPurchase:monthlySavings-monthlyAgioPayment};
                payed+=monthlyAgioPayment
            }
            else
            {
                payed+=rest
                element = {month:month,saving:monthlySavings,agio:rest,assetPurchase:monthlySavings-rest};
            }
            agioTableData.push(element);
            month++;
        }
        return agioTableData;
    }
    public static async getIntervalIds():Promise<Array<SavingsPlanPaymentInterval>>{
        const url = this.links.getSavingPlanPaymentInterval();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let data:SavingsPlanPaymentInterval[] = json.data;
        return data;
    }
    public static async updateDepotAvatar(depotId: number, payload:UpdateDepotRequest):Promise<Depot>{
        try{
            const url = this.links.updateDepotAvatar(depotId);
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            const json = await this.requester.put(url,this.headers, payload);
            return json.data;
        }
        catch(err){
            throw err;
        }
    }
    public static async detailPaymentAccount(id: number):Promise<Depot>{
        try{
            const url = this.links.detailPaymentAccount(id);
            const token = TokenService.getToken();
            this.headers.addAuthHeader(token);
            const json = await this.requester.get(url,this.headers);
            return json.data;
        }
        catch(err){
            throw err;
        }
    }
}