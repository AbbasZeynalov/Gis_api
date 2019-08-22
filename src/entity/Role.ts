import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {IRole} from "../models/entity/IRole";

@Entity()
export class Role implements IRole {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_name: string;
}
