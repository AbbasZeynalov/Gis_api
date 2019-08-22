import {Err, SchemaLike, ValidationOptions, ValidationResult} from "joi";

export interface IBaseController {
    logger: any;
    validation: Error;
    joiValidate: (obj: object, schema: SchemaLike, options: ValidationOptions) => ValidationResult<ValidationOptions>
}

