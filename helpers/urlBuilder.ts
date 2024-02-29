export const urlBuilder = (lang:string,pathTo:string)=>{
    const url = window.location.origin+'/'+lang+pathTo;
    return url;
}