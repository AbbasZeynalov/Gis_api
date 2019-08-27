import {
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {IUserGroup} from "../../models/entity/IUserGroup";
import {User} from "./User";
import {UserGroup} from "./UserGroup";
import {PermissionOperation} from "./PermissionOperation";
import {PermissionEntity} from "./PermissionEntity";

@Entity()
export class UserGroupPermissions {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserGroup)
    @JoinColumn({ name: "user_group_id" })
    userGroup: UserGroup;

    @ManyToOne(type => PermissionOperation)
    @JoinColumn({ name: "permission_operation_id" })
    permissionOperation: PermissionOperation;

    @ManyToOne(type => PermissionEntity)
    @JoinColumn({ name: "permission_entity_id" })
    permissionEntity: PermissionEntity;
}
