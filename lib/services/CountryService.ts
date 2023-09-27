import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { Country } from '../models/country';
export class CountryService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getCountryList(all:Boolean,isCode=false):Promise<Array<Country>>{
        let res:Array<Country> = await this.requester.get(this.links.getCountries(isCode),this.headers);
        if(all)
            return res;
        else
        {
            return res.filter(element=>element.allow);
        }
    }
}