import moment from 'moment'
export const dateFormat1 = "YYYY-MM-DD HH:mm:ss"
export const dateFormat2 = "YYYY-MM-DD"
export const formatDate= (date:Date)=>{
    if(!date)
        return null;
    let month = date.getMonth()+1;
    if(month<10)
    {
        month ="0"+month;
    }
    let day = date.getDate();
    if(day<10)
    {
        day = "0"+day;
    }
    return date.getFullYear()+"-"+month+"-"+day;
}

export const formatTime = (date: Date) =>
{
    let d = new Date(date);
    let hours: number | string = d.getHours();
    if(hours<10)
    {
        hours = "0"+hours;
    }
    let minutes: number | string = d.getMinutes();
    if(minutes < 10 )
    {
        minutes = "0"+minutes;
    }
    return hours+":"+minutes;
}

export const formatDateByMoment= (date:Date, formatType = dateFormat1)=>{
    return moment(date).format(formatType);
}
export const formatIban = (iban:string)=>{
    var lastDigits  = iban.substr(iban.length - 4);
    return "**** "+lastDigits;
}