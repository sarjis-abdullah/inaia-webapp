import { TokenExpiredException } from './../exceptions/TokenExpiredException';
import moment from "moment";

export class TokenService {
    private static token:string;
    private static expirationDate:any;
    public static init(token:string,expDate:string)
    {
        this.token = token;
        this.expirationDate = moment(expDate);
        if(!this.expirationDate){
            throw new TokenExpiredException("token expiration date not found");
        }
    }
    public static getToken():string{
        const now = moment();
        if(now<this.expirationDate){
            return this.token;
        }
        throw new TokenExpiredException("token expired");
    }
}