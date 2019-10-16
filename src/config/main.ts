import {ConnectionOptions} from "typeorm";
import {Module} from "../entity/modules/Module";
import {ModuleVersion} from "../entity/modules/ModuleVersion";
import {PermissionEntity} from "../entity/user/PermissionEntity";
import {PermissionOperation} from "../entity/user/PermissionOperation";
import {User} from "../entity/user/User";
import {UserGroup} from "../entity/user/UserGroup";
import {UserGroupPermissions} from "../entity/user/UserGroupPermissions";
import {UserPermissions} from "../entity/user/UserPermissions";
const path = require('path');

export const getDbSettings = (url: string): ConnectionOptions  => {

    // @ts-ignore
    // let appDir = path.dirname(require.main.filename);
console.log(url);
    return {
        "url": url,
        "type": "mysql",
        "synchronize": true,
        "logging": false,
        "entities": [
            // appDir+"/entity/**/*",
            Module, ModuleVersion, PermissionEntity, PermissionOperation, User,
            UserGroup, UserGroupPermissions, UserPermissions
        ],
        "migrations": [
            "../migration/*"
        ],
        "subscribers": [
            "../subscriber/*"
        ],
    }
};
