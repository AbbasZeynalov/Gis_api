import {
    Column,
    Entity, JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity()
export class PermissionEntity {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    table_name: string;
}
