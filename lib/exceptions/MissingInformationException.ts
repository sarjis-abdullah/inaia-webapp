import { ExceptionInterface } from "./ExceptionInterface";

export class MissingInformationException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, MissingInformationException.prototype);
    }
    getMessage():string{
        return "Bad or missing information";
    }
    getTranslationKey():string{
        return 'missing_information_error'
    }
    getRealMessage():string{
        return this.message;
    }
}