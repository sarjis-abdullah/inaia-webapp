import { PaginationResponse } from './../responses/PaginationResponse';
import { Order } from '../models/Order';
import { PageRequest } from '../requests/PageRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class TransactionService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getLastTransactions(request:PageRequest):Promise<PaginationResponse<Order>>{
        const url = this.links.getLastTransactionUrl(request.page,request.perPage);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<Order> = {
            data:json.data,
            currentPage:json.current_page,
            lastPage:json.last_page
        };
        return response;
    }
}