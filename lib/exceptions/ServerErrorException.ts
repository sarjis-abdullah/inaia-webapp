import { ExceptionInterface } from "./ExceptionInterface";

export class ServerErrorException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, ServerErrorException.prototype);
    }
    getMessage():string{
        return "We couldn't proceed with your request due to a server error, please try again later";
    }
    getTranslationKey():string{
        return 'server_error'
    }
    getRealMessage():string{
        return this.message;
    }
}