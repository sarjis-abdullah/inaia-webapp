import { ExceptionInterface } from "./ExceptionInterface";

export class BadInputException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, BadInputException.prototype);
    }
    getMessage():string{
        return "Bad input";
    }
    getTranslationKey():string{
        return 'bad_input_error';
    }
    getRealMessage():string{
        return this.message;
    }
}