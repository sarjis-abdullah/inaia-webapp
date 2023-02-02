export class HttpHeader{
    private headers:Array<Object> ;
    public constructor(){
        this.headers = new Array();
        /*this.headers.push([{
            'Accept':'application/json'
        }])*/
    }
    public addHeader(key:string,value:string){
        this.headers.push({
            key:value
        });
    }
    public getHeaders():any{
        let header = {};
        this.headers.forEach(element=>{
            header = {...element};
        })
        return header;
    }
}