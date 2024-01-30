import { StatementDateFilterRequest } from '@/lib/requests/index';
import { PageRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class AttachmentService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    
    public static async getDepotOrderSatement(depot_id:number, request:StatementDateFilterRequest):Promise<Blob>{
        const url = this.links.getDepotOrderStament(depot_id, request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        return await this.requester.getFile(url,this.headers);
    }
}