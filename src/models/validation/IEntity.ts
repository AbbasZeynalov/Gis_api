import {ObjectSchema} from "joi";
import {ILogin} from "../forms/auth/ILogin";

export interface IEntityValidation {
    load?: (obj: any) => ILogin
    schema?: () => ObjectSchema
}
