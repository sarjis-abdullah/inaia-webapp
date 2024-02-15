import { PaginationResponse } from '../responses/PaginationResponse';
import { PageRequest } from '../requests/PageRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
import { SupportTicket, SupportMessages, SupportStatus } from '../models';
import { CreateSupportTicketMessageRequest, CreateSupportTicketRequest } from '../requests';
import { SupportTicketStatusUpdateRequest } from '../requests/SupportTicketStatusRequest';
export class SupportTicketService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();

    public static async getSupportTickets(request:PageRequest):Promise<PaginationResponse<SupportTicket>>{
        const url = this.links.getSupportTickets(request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<SupportTicket> = {
            data:json.data,
            currentPage:json.meta.current_page,
            lastPage:json.meta.last_page,
            total:json.meta.total
        };
        return response;
    }

    public static async getSingleSupportTicket(ticketId: number):Promise<SupportTicket>{
        const url = this.links.getSingleSupportTicket(ticketId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json = await this.requester.get(url,this.headers);
        return json.data;
    }

    public static async sendMessageForSupportTicket(supportMessage: CreateSupportTicketMessageRequest):Promise<SupportMessages>{
        const url = this.links.sendMessageForSupportTicket();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json = await this.requester.post(url,this.headers, supportMessage);
        return json.data;
    }

    public static async createSupportTicket(supportTicket: CreateSupportTicketRequest):Promise<SupportTicket>{
        const url = this.links.createSupportTicket();
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json = await this.requester.post(url,this.headers, supportTicket);
        return json.data;
    }

    public static async updateSupportTicketStatus(ticketId: number, supportStatus: SupportTicketStatusUpdateRequest):Promise<SupportStatus>{
        const url = this.links.updateSupportTicketStatus(ticketId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        const json = await this.requester.put(url,this.headers, supportStatus);
        return json.data;
    }

    public static async getSupportTicketStatusList(request:PageRequest):Promise<PaginationResponse<SupportStatus>>{
        const url = this.links.getSupportTicketStatusList(request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.get(url,this.headers);
        let response:PaginationResponse<SupportStatus> = {
            data:json.data,
            currentPage:json.meta.current_page,
            lastPage:json.meta.last_page,
            total:json.meta.total
        };
        return response;
    }
}