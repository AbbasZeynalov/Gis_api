import {ILogin} from "../models/forms/auth/ILogin";
import {IEntityValidation} from "../models/validation/IEntity";

const Joi = require('joi');

export default class LoginForm implements ILogin, IEntityValidation
{
    user_name: string;
    password: string;

    load(obj: ILogin) {
        this.user_name = obj.user_name;
        this.password = obj.password;

        return this;
    }

    schema() {
        return Joi.object().keys({
            user_name: Joi.string().alphanum().min(3).max(255).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
    }
}
