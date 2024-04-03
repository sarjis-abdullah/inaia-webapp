
import { PricePeriods } from "../contants";
import { PageRequest } from "../requests";
import { StatementDateFilterRequest } from "@/lib/requests/index";
import { BaseUrls } from "./BaseUrls";
import { objectToQueryString } from "./QueryParamsHelper";
const ACCOUNT_INCLUDES = "include=person_data,account,address,channels,country,new_inbox_message_count,new_support_ticket_answer_count,products,product_specs,kyc_details";
const DEPOT_INCLUDES = "depot_status,depot_status_history,depot_orders,depot_agio_transactions,account,interval";
const SINGLE_SUPPORT_TICKET_INCLUDE = "include=messages,creater,owner,contacts,support_status,person_data"
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
    public termsAndConditions(conditionType:string,country?:number):string{
        let path = '';
        if(country){
            path = `conditions?country_id=${country}&condition_type_prerequisite=${conditionType}&per_page=500`;
        }
        else{
            path = `conditions?condition_type_prerequisite=${conditionType}&per_page=500`
        }
        return this.buildUrl(BaseUrls.getCoreUrl(),path)
    }
    public registerCustomer():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'register');
    }
    public resetPassword():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'password-reset/apply');
    }
    public verfiyResetPasswordToken():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'password-reset/check');
    }
    public resetPin():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'accounts/pin-reset');
    }
    public login():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'authenticate?'+ACCOUNT_INCLUDES);
    }
    public getProfileUrl(id:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`contacts/${id}?${ACCOUNT_INCLUDES}`);
    }
    public getAssetsUrl(accountId:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`assets/${accountId}`);
    }
    public getLastTransactionUrl(page:number,per_page:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`orders/account-activities?include=order_transactions,orders_payment_transactions&page=${page}&per_page=${per_page}`);
    }
    public getDepotListUrl(depotTypeId?:number,page:number = 1,perPage:number = 100):string{
        let url =  `depots/account-depots?include=${DEPOT_INCLUDES}&page=${page}&per_page=${perPage}`;
        if(depotTypeId){
            url += `&depot_type_id=${depotTypeId}`;
        }
        return  this.buildUrl(BaseUrls.getGoldDinarUrl(),url);
    }
    public getGoldPrice(currency:string):string {
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'current-gold-price?currency='+currency);
    }
    public getSilverPrice(currency:string):string {
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'current-silver-price?currency='+currency);
    }
    public getDepotTypesUrl(){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'depot-types');
    }
    public getGoldPriceVariationData(period:string,currency:string){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`historical-price?type=${period}&currency=${currency}`);
    }
    public getSilverPriceVariationData(period:string,currency:string){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`silver-price-historical?period=${period}&currency=${currency}`);
    }
    public requestPassword():string{
        return this.buildUrl(BaseUrls.getCoreUrl(),'password-reset/request');
    }
    public depotDetail(id:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`depots/${id}?include=depot_status`);
    }
    public depotHistoryValue(depot_id:number,period:string):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`depots/${depot_id}/history?period=${period}`);
    }
    public getDepotOrders(depot_id:number,request:PageRequest):string{
        const queryParams = objectToQueryString(request);
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`orders/depot-orders/${depot_id}?include=order_transactions,orders_payment_transactions&${queryParams}`);
    }
    public getDepotOrderStament(depot_id:number, request: StatementDateFilterRequest):string{
        const queryParams = objectToQueryString(request);
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`depots/${depot_id}/statement?${queryParams}`);
    }
    public getSavingPlanTarget():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'target-types');
    }
    public addDepot():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'depots');
    }
    public accountPorductDetails(id:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`accounts/${id}/product-fees`);
    }
    public getClientPaymentAccounts():string{
        return this.buildUrl(BaseUrls.getPaymentUrl(),'payment-account/user-accounts');
    }
    public getKycStartAccount(id:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`accounts/${id}/kyc`);
    }
    public getSavingPlanPaymentInterval():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'intervals');
    }
    public addSavingPlan(depotId:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),`depots/${depotId}/savings-plan`);
    }
    public updateAddress(addressId:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`addresses/${addressId}`);
    }
    public updateChannel(channelId?:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`contact-channels${channelId?'/'+channelId:''}`);
    }
    public updateSettings(accountId?:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(),`account-settings/${accountId}`);
    }
    public markPaymentAsDefault(paymentAccountId?:number):string{
        return this.buildUrl(BaseUrls.getPaymentUrl(),`payment-account/${paymentAccountId}/default`);
    }
    public deletePaymentBankAccount(paymentAccountId?:number):string{
        return this.buildUrl(BaseUrls.getPaymentUrl(),`payment-account/${paymentAccountId}`);
    }
    public addPaymentBankAccount():string{
        return this.buildUrl(BaseUrls.getPaymentUrl(),'payment-account/create');
    }
    public getInboxMessages(account_id:number,request:PageRequest):string{
        const queryParams = objectToQueryString(request);
        return this.buildUrl(BaseUrls.getCoreUrl(), `inbox-message?account_id=${account_id}&include=message_text,documents&${queryParams}`);
    }
    public getSingleInboxMessage(messageId: number,account_id:number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(), `inbox-message/${messageId}?account_id=${account_id}&include=message_text,documents`);
    }
    public getSupportTickets(request:PageRequest):string{
        const queryParams = objectToQueryString(request);
        const include = "include=creater,contacts,support_status,person_data"
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-tickets?${include}&${queryParams}`);
    }
    public getSupportTicketStatusList(request:PageRequest):string{
        const queryParams = objectToQueryString(request);
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-statuses?${queryParams}`);
    }
    public getSingleSupportTicket(ticketId: number):string{
        const include = SINGLE_SUPPORT_TICKET_INCLUDE
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-tickets/${ticketId}?${include}`);
    }
    public sendMessageForSupportTicket():string{
        const include = SINGLE_SUPPORT_TICKET_INCLUDE
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-messages?${include}`);
    }
    public createSupportTicket():string{
        const include = SINGLE_SUPPORT_TICKET_INCLUDE
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-tickets?${include}`);
    }
    public updateSupportTicketStatus(ticketId: number):string{
        const include = "include=support_status"
        return this.buildUrl(BaseUrls.getCoreUrl(), `support-tickets/${ticketId}?${include}`);
    }
    public updatePassword():string{
        return this.buildUrl(BaseUrls.getCoreUrl(), `password-update`);
    }
    public updateProfile(contactId: number):string{
        return this.buildUrl(BaseUrls.getCoreUrl(), `contacts/update-avatar/${contactId}`);
    }
    public updateDepotAvatar(depotId: number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), `depots/update-avatar/${depotId}`);
    }
    public getOrderPreview():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), 'orders/preview');
    }
    public placeOrder():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), 'orders');
    }
    public confirmOrder():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), 'orders/confirm');
    }
    public getPendingApprovals():string{
        return this.buildUrl(BaseUrls.getCoreUrl(), 'pending-approvals?show_approved=1');
    }
    public getConfirmationMethods():string{
        return this.buildUrl(BaseUrls.getCoreUrl(), 'order-approval-methods');
    }
    public transferAsset():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), 'depots/transfer');
    }
    public confirmTransferOrder():string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), 'depots/transfer/confirm');
    }
    public getTradableAmount(depotId:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), `depots/${depotId}/tradeable-amount?include=order_transactions,orders_payment_transactions,depot`);
    }
    public detailPaymentAccount(id:number):string{
        return this.buildUrl(BaseUrls.getPaymentUrl(), `payment-account/${id}`);
    }
    public paymentAccounts():string{
        return this.buildUrl(BaseUrls.getPaymentUrl(), `payment-account/user-accounts`);
    }
    public paymentMethods():string{
        return this.buildUrl(BaseUrls.getPaymentUrl(), `payment-methods`);
    }
    public updateDepotInfo(id:number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), `depots/${id}`);
    }
    public updateDepotStatus(depotId: number):string{
        return this.buildUrl(BaseUrls.getGoldDinarUrl(), `depots/${depotId}/status`);
    }
    public getDepotStatusList(){
        return this.buildUrl(BaseUrls.getGoldDinarUrl(),'depot-statuses');
    }
    private buildUrl(baseUrl:string,path:string):string{
        return baseUrl + path;
    }

}