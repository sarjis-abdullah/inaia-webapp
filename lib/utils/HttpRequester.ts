import { BadInputException } from './../exceptions/BadInputException';
import { UnauthenticatedException } from './../exceptions/UnauthenticatedException';
import { HttpResponse } from './HttpResponse';
import { HttpHeader } from "./HttpHeader";
import { ServerErrorException } from "../exceptions/ServerErrorException";
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { MissingInformationException } from '../exceptions/MissingInformationException';
import { UnauthenticatedEvent } from '../events';
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
    public async getFile(url:string,headers:HttpHeader):Promise<Blob>{
        const response = await fetch(url,{headers:headers.getHeaders()});
        if(response.ok)
        {
            return await response.blob();
        }
        else{
            throw await this.handleError(response);
        }
    }
    public async post(url:string,headers:HttpHeader,data:Object):Promise<HttpResponse | any>{
        
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
    public async put(url:string,headers:HttpHeader,data:Object):Promise<HttpResponse>{
        
        const response = await fetch(url,{
            method:'PUT',
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
    public async delete(url:string,headers:HttpHeader):Promise<HttpResponse>{
        
        const response = await fetch(url,{
            method:'DELETE',
            headers:headers.getHeaders(),
        });
        if(response.ok)
        {
            return true
        }
        else{
            throw await this.handleError(response);
        }
   
    }
    private async handleError(response:Response):Promise<Error>{
        let status = response.status;
        let error = "";
        try{
            let errorJson = await response.json();
      
            if(errorJson.errors && errorJson.errors.message)
                error = errorJson.errors.message;
            else if(errorJson.data && errorJson.data.message)
                error = errorJson.data.message;
            else
                error = errorJson.message;
        }
        catch(err){
            error = await response.text();
        }
        if(status == 401){
            const event = new UnauthenticatedEvent();
            
            //return new UnauthenticatedException(error);
        }
        if(status == 403)
        {
            return new UnauthorizedException(error);
        }
        if(status == 422){
            return new BadInputException(error);
        }
        if(status>=400 && status<500)
        {
            return new MissingInformationException(error)
        }
        return new ServerErrorException(error);
    }
}