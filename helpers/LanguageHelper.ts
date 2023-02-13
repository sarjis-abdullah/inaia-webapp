import { Languages } from './../constants/Languages';
export function getCountryByLanguage(local:string):string{
    if(local == 'de'){
        return Languages.de;
    }
    if(local == 'en'){
        return Languages.en;
    }
    if(local == 'fr'){
        return Languages.fr;
    }
    return Languages.en;
}