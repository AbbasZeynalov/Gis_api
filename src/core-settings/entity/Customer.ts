import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Customer  {

    @PrimaryGeneratedColumn()
    id: number;

    constructor(id?: number) {
        id && (this.id = id);
    }

    @Column()
    name: string;

    @Column()
    uuid: string;

    @Column()
    db_conn_secret: string;

    @Column()
    key: string;

}

