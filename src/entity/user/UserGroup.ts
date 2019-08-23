import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {IUserGroup} from "../../models/entity/IUserGroup";

@Entity()
export class UserGroup implements IUserGroup {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
