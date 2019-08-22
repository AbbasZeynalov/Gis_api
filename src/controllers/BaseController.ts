import Logger from "../utils/logger";

import * as Joi from 'joi';
import { ValidationOptions, ValidationResult} from "joi";
import {SchemaLike} from "joi";
import {IBaseController} from "../models/controllers/IBaseController";
import UserError from "../utils/UserError";
import httpResponse from "../utils/response/httpResponse";

export default class BaseController implements IBaseController {
    public logger: Logger;
    public validation: httpResponse;

    constructor() {
        this.logger = new Logger();
        this.validation = new httpResponse();
    }

    public joiValidate(obj: object, schema: SchemaLike, options: ValidationOptions = {}): ValidationResult<ValidationOptions> {

        return Joi.validate(obj, schema, {
            abortEarly: false,
            ...options
        });
    }

    public validate(obj: object, schema: SchemaLike, options: ValidationOptions = {}) {

        let validation = this.joiValidate(obj, schema);

        if (validation.error)
            throw new UserError(null, '', validation.error.details);
    }

    public catchError(e: Error) {

        if(e instanceof UserError) {

            if(e.code || e.message)
                this.validation.addError(e.code as number, e.message);

            else if (e.errors)
                this.validation.addErrors(e.errors);

            return this.validation;
        } else
            this.logger.error(e);
    }
}
