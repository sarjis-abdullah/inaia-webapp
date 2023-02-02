import { HttpHeader } from "./HttpHeader";
export class HttpRequester{
    private static instance: HttpRequester;
    public static httpRequester():HttpRequester{
        if (!HttpRequester.instance) {
            HttpRequester.instance = new HttpRequester();
        }

        return HttpRequester.instance;
    }
    public get(url:string,headers:HttpHeader):Promise<Response>{
        console.log(headers.getHeaders());
        return fetch(url,{headers:headers.getHeaders()});
    }
    public post(url:string,headers:HttpHeader,data:Object):Promise<any>{
        return fetch(url,{
            method:'POST',
            headers:headers.getHeaders(),
            body:JSON.stringify(data)
        });
    }
}