import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ON_OFF_STATUS} from "../../config/constant";
import {UserGroup} from "./UserGroup";
import {IUser} from "../../models/entity/IUser";
import * as Joi from 'joi';
import {IEntityValidation} from "../../models/validation/IEntity";
import {UserPermissions} from "./UserPermissions";
import {PermissionEntity} from "./PermissionEntity";
import {PermissionOperation} from "./PermissionOperation";

@Entity()
export class User implements IUser, IEntityValidation {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column({
        type: "enum",
        enum: [ON_OFF_STATUS.OFF, ON_OFF_STATUS.ON],
        default: ON_OFF_STATUS.ON
    })
    active: ON_OFF_STATUS;

    @OneToMany(type => UserPermissions, userPermissions => userPermissions.user)
    userPermissions: UserPermissions;

    load(obj: IUser) {

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
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            userPermissions: Joi.array().min(1),
        });
    }
}
