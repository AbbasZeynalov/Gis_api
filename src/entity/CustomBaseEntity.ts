import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICustomBaseEntity, Pagination} from "../models/entity/ICustomBaseEntity";
import {DEFAULT_PAGINATION_LIMIT, ON_OFF_STATUS} from "../config/constant";

export class CustomBaseEntity implements ICustomBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @Column({
        type: "enum",
        enum: [ON_OFF_STATUS.OFF, ON_OFF_STATUS.ON],
        default: ON_OFF_STATUS.ON
    })
    active: ON_OFF_STATUS;


}
