import {ValidationErrorItem} from "joi";

export default class UserError extends Error {

    public code: number | null;
    public errors?: ValidationErrorItem[];

    constructor(code: number | null = null, msg: string = '', errors?: ValidationErrorItem[]) {
        super();

        this.code = code;
        this.message = msg;
        this.errors = errors;
    }
}
