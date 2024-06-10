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
    public addAuthHeader(token:string):HttpHeader{
        const doExists = this.headers.findIndex(header=>header.key == "Authorization");
        if(doExists > -1){
            this.headers.splice(doExists,1)
        }
        this.headers.push({
            key:"Authorization",
            value:"Bearer " + token
        })
        return this; 
    }
    public addLocationHeader(language:string):HttpHeader{
        const doExists = this.headers.findIndex(header=>header.key == "X-localization");
        if(doExists > -1){
            this.headers.splice(doExists,1)
        }
        this.headers.push({
            key:"X-localization",
            value:language
        })
        return this;
    }
    public addXpiKeyHeader(key:string):HttpHeader{
        const headerKey = "x-api-key"
        const doExists = this.headers.findIndex(header=>header.key == headerKey);
        if(doExists > -1){
            this.headers.splice(doExists,1)
        }
        this.headers.push({
            key:headerKey,
            value:key
        })
        return this;
    }
}