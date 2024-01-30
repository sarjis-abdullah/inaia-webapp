import { PageRequest } from '../requests';
import { StatementDateFilterRequest } from '../requests/DateFilterRequest';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class AttachmentService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    
    public static async getDepotOrderSatement(depot_id:number, request:StatementDateFilterRequest):Promise<void>{
        const url = this.links.getDepotOrderStament(depot_id, request);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let response = await this.requester.getFile(url,this.headers);
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(response);
        a.download = `${depot_id}-${'statement'}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}