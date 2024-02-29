import { StartKycRequest } from '../requests';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';
export class KycService {
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async startKycProcess(accountId:number,request:StartKycRequest):Promise<string>{
        //return "https://alchemy.veriff.com/v/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEwODkyNDgsInNlc3Npb25faWQiOiI1NzUwOTc5ZS03MGQxLTRmOWItYTE3NC04YmEzYjAyM2U4NzUiLCJpaWQiOiI0MzE4Y2FlNS1hYjYwLTQzMjYtODFiOC02N2MwNDI0YTA0YjQifQ.rcwZCAqkNqx1mhg0ce9aINJN9QY-2rgox6KBcdV3jro"
        const url = this.links.getKycStartAccount(accountId);
        const token = TokenService.getToken();
        this.headers.addAuthHeader(token);
        let json = await this.requester.post(url,this.headers,request);
        return json.data.url;
        
    }
}