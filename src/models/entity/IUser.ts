import {ON_OFF_STATUS} from "../../config/constant";
import {IUserGroup} from "./IUserGroup";
import {IEntityValidation} from "../validation/IEntity";
import {ICustomBaseEntity} from "./ICustomBaseEntity";
import {PermissionOperation} from "../../entity/user/PermissionOperation";
import {PermissionEntity} from "../../entity/user/PermissionEntity";

export interface IUser extends ICustomBaseEntity {
    username: string
    firstname: string
    lastname: string
    patronymic: string
    email: string
    password: string
    password_repeat?: string
    access_token?: string
    userPermissions: any
}

export interface IUserPermissions {
    id: number;
    user: IUser;
    permissionOperation: PermissionOperation;
    permissionEntity: PermissionEntity;
}

export interface IRequestUserPermissions {
    entity_id: number,
    entity_operations: number[]
}
