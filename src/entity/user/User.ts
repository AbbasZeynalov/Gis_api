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
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

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

        this.username = obj.username;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.password = obj.password;
        this.password_repeat = obj.password_repeat;
        this.userPermissions = obj.userPermissions;

        return this;
    }

    schema() {
        return Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(255).required(),
            firstname: Joi.string().alphanum().min(3).max(255).required(),
            lastname: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            userPermissions: Joi.array().min(1),
        });
    }
}

