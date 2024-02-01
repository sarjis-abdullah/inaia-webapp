import { PaginationResponse } from '../responses/PaginationResponse';
import { PageRequest } from '../requests/PageRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { InboxMessage } from '../models';
export class InboxMessageService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();

    public static async getInboxMessages(account_id:number,request:PageRequest):Promise<PaginationResponse<InboxMessage>>{
        const url = this.links.getInboxMessages(account_id,request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<InboxMessage> = {
            data:json.data,
            currentPage:json.meta.current_page,
            lastPage:json.meta.last_page,
            total:json.meta.total
        };
        return response;
    }

    public static async getSingleInboxMessage(messageId: number, account_id:number):Promise<InboxMessage>{
        const url = this.links.getSingleInboxMessage(messageId, account_id);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json = await this.requester.get(url,this.headers);
        return json.data;
    }
}