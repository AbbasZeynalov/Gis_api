import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserAttr} from "./UserAttr";
import {ON_OFF_STATUS} from "../config/constant";
import {Role} from "./Role";
import {IUser} from "../models/entity/IUser";
import {IEntityValidation} from "../models/validation/IEntity";

@Entity()
export class User extends UserAttr implements IUser {

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

    @ManyToMany(type => Role)
    @JoinTable()
    role: Role[];
}
