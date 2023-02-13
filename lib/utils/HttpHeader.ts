import { HttpHeaderInterface } from "./HttpHeaderInterface";
export class HttpHeader{
    private headers:Array<HttpHeaderInterface> ;
    public constructor(){
        this.headers = new Array();
        this.headers.push({
            key:'content-type',value:'application/json'},  
            {key:'accept',value:'application/json'
        });
    }
    public addHeader(key:string,value:string){
        this.headers.push({
            key:key,
            value:value
        });
    }
    public getHeaders():any{
        let header = Object.assign({}, ...(this.headers.map(item => ({ [item.key]: item.value }) )));
        return header;
    }
    public addLocationHeader(language:string):HttpHeader{
        this.headers.push({
            key:"X-localization",
            value:language
        })
        return this;
    }
}