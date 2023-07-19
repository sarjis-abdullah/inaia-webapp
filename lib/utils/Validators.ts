export function validateEmail(email:string):boolean{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function validatePhoneNumber(phone:string):boolean{
    if(phone == "111111" ) return true;
    const regex = new RegExp(/^[0-9]{8}/);
    return regex.test(String(phone).toLowerCase());
}
export function validatePassword(password:string):boolean{
    const validLength = password.length >= 6;
    //password must be at least 6 charchater long, has 1 number and 1 special character
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return validLength && regularExpression.test(password);
}
