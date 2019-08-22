import {IUser} from "../models/entity/IUser";
import {IRole} from "../models/entity/IRole";
import {IEntityValidation} from "../models/validation/IEntity";
const Joi = require('joi');

export class UserAttr implements IEntityValidation
{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_repeat?: string;
    role: IRole[];

    load(obj: IUser) {

        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.password_repeat = obj.password_repeat;
        this.role = obj.role;

        return this;
    }

    schema() {
        return Joi.object().keys({
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            role: Joi.array().min(1),
        });
    }
}
