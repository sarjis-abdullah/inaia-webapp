import { HttpResponse } from './HttpResponse';
import { HttpHeader } from "./HttpHeader";
import { ServerErrorException } from "../exceptions/ServerErrorException";
export class HttpRequester{
    private static instance: HttpRequester;
    public static httpRequester():HttpRequester{
        if (!HttpRequester.instance) {
            HttpRequester.instance = new HttpRequester();
        }

        return HttpRequester.instance;
    }
    public async get(url:string,headers:HttpHeader):Promise<HttpResponse>{
        
        const response = await fetch(url,{headers:headers.getHeaders()});
        if(response.ok)
        {
            return await response.json();
        }
        else{
            throw await this.handleError(response);
        }
    }
    public async post(url:string,headers:HttpHeader,data:Object):Promise<HttpResponse>{
        
        const response = await fetch(url,{
            method:'POST',
            headers:headers.getHeaders(),
            body:JSON.stringify(data)
        });
        if(response.ok)
        {
            return await response.json();
        }
        else{
            throw await this.handleError(response);
        }
   
    }
    private async handleError(response:Response):Promise<Error>{
        let status = response.status;
        let errorJson = await response.text();
        if(status == 401){
            
            
        }
        if(status == 403)
        {
            
        }
        return new ServerErrorException(errorJson);
    }
}