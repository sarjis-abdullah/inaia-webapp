import moment from 'moment'
const dateFormat1 = "YYYY-MM-DD HH:mm:ss"
const dateFormat2 = "YYYY-MM-DD"
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

export const formatDateByMoment= (date:Date, formatType = dateFormat1)=>{
    return moment(date).format(formatType);
}