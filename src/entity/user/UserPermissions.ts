import {
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {IUserGroup} from "../../models/entity/IUserGroup";
import {User} from "./User";
import {UserGroup} from "./UserGroup";
import {PermissionOperation} from "./PermissionOperation";
import {PermissionEntity} from "./PermissionEntity";

@Entity()
export class UserPermissions {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.userPermissions)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(type => PermissionOperation)
    @JoinColumn({ name: "permission_operation_id" })
    permissionOperation: PermissionOperation;

    @ManyToOne(type => PermissionEntity)
    @JoinColumn({ name: "permission_entity_id" })
    permissionEntity: PermissionEntity;
}
