
import { PaymentMethod} from '../models';
import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { TokenService } from './TokenService';

export class PaymentMethodsService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getTheListOfPaymentMethods():Promise<Array<PaymentMethod>>{
        try{
            const url = this.links.paymentMethods();
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