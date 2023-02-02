import { HttpHeader } from '../utils/HttpHeader';
import { HttpRequester } from '../utils/HttpRequester';
import { Urls } from "../utils/Urls";
import { Country } from '../models/country';
export class CountryService{
    private static links = Urls.URLS();
    private static requester = HttpRequester.httpRequester();
    private static headers = new HttpHeader();
    public static async getCountryList(all:Boolean):Promise<Array<Country>>{
        let res = await this.requester.get(this.links.getCountries(),this.headers);
        let json:Array<Country>= await res.json();
        if(all)
            return json;
        else
        {
            return json.filter(element=>element.allow);
        }
    }
}