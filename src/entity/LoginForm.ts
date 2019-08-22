import {ILogin} from "../models/forms/auth/ILogin";

const Joi = require('joi');

export default class LoginForm implements ILogin
{
    email: string;
    password: string;

    load(obj: ILogin) {
        this.email = obj.email;
        this.password = obj.password;

        return this;
    }

    schema() {
        return Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
    }
}
