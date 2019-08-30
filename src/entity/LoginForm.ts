import {ILogin} from "../models/forms/auth/ILogin";
import {IEntityValidation} from "../models/validation/IEntity";

const Joi = require('joi');

export default class LoginForm implements ILogin, IEntityValidation
{
    username: string;
    password: string;

    load(obj: ILogin) {
        this.username = obj.username;
        this.password = obj.password;

        return this;
    }

    schema() {
        return Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(255).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
    }
}
