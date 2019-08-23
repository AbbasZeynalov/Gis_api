import {
    Column,
    Entity, JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity()
export class PermissionOperation {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
