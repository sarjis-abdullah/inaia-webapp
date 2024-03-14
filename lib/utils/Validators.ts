import moment from "moment";

export function validateEmail(email:string):boolean{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function validatePhoneNumber(phone:string):boolean{
    const sanitized = sanitizePhoneNumber(phone);
    if(sanitized == "111111" ) return true;
    const regex = new RegExp(/^[0-9]{8}/);
    return regex.test(String(sanitized).toLowerCase());
}
export function validatePassword(password:string):boolean{
    const validLength = password.length >= 6;
    //password must be at least 6 charchater long, has 1 number and 1 special character
    var regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?§&+-=_.://()])[A-Za-z\d@$!%*#?§&+-=_.://()]{8,}$/;
    return validLength && regularExpression.test(password);
}
export const sanitizeEmail = (email:string) => {
    if(email && email.replace)
        return email.replace(/\s/g, '' );
    else{
        return '';
    }
}
export const validateBirthdate = (date:Date) => {
    const now = moment();
    const birthdate = moment(date);
    return now.diff(birthdate,'year') >=18;
}
export const sanitizePhoneNumber = (number:string)=>{
    if(number.startsWith('0')){
        return number.replace('0','');
    }
    else {
        return number;
    }
}
export const validateIban = (iban:string)=>{
    const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regex.test(iban);
}
export const verifyIsAccountNumber = (value:string)=>{
    return value.toLowerCase().indexOf('gd')==0;
}
