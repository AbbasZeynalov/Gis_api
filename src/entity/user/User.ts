import {
    Column,
    Entity,
    OneToMany,
} from "typeorm";
import {IUser} from "../../models/entity/IUser";
import * as Joi from 'joi';
import {IEntityValidation} from "../../models/validation/IEntity";
import {UserPermissions} from "./UserPermissions";
import {CustomBaseEntity} from "../CustomBaseEntity";

@Entity()
export class User extends CustomBaseEntity implements IUser, IEntityValidation {


    constructor(id?: number) {
        super();
        id && (this.id = id);
    }

    @Column()
    user_name: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    patronymic: string;

    @Column()
    email: string;

    @Column()
    password: string;

    password_repeat?: string;

    @OneToMany(type => UserPermissions, userPermissions => userPermissions.user)
    userPermissions: UserPermissions;

    load(obj: IUser) {

        this.user_name = obj.user_name;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.password_repeat = obj.password_repeat;
        this.userPermissions = obj.userPermissions;

        return this;
    }

    schema() {
        return Joi.object().keys({
            user_name: Joi.string().alphanum().min(3).max(255).required(),
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            userPermissions: Joi.array().min(1),
        });
    }
}

