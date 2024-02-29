
import { BadInputException, MissingInformationException,ServerErrorException } from '@/lib/exceptions';
export const getMessageFromError=(error:any)=>{
    const {t} = useI18n();
    if(error instanceof MissingInformationException || error instanceof BadInputException){
        return error.getRealMessage();
    }
    else if(error instanceof ServerErrorException){
        return t(error.getTranslationKey());
    }
    else
         return t(error.getTranslationKey());
}