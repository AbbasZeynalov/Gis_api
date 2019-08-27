import {getManager} from "typeorm";
import {PermissionEntity} from "../../entity/user/PermissionEntity";
import {PermissionOperation} from "../../entity/user/PermissionOperation";
import {NextFunction, Request, Response} from "express";
import Settings from "./Settings";

// export let SETTINGS: any = {
//     permissions: {
//         entities: [],
//         operations: []
//     }
// };
// export let PERMISSION_ENTITIES = SETTINGS.permissions.entities;
// export let PERMISSION_OPERATIONS = SETTINGS.permissions.operations;

export async function AuthPermission(req: Request, res: Response, next: NextFunction) {

    let settings = new Settings();
    const entityManager = getManager();

    let entities = await entityManager.find(PermissionEntity);
    let operations = await entityManager.find(PermissionOperation);

    settings.setAuthEntities = entities;
    settings.setAuthOperations = operations;


    // SETTINGS.permissions.entities = entities;
    // SETTINGS.permissions.operations = operations;

    // setAuth(entities);


    // console.log(entities);
    // console.log(operations);

    // SETTINGS = {
    //     permissions: {
    //         entities: {'b': 1},
    //         operations: operations
    //     }
    // };

    next();
}
