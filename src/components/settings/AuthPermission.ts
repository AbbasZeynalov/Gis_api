import {getManager} from "typeorm";
import {PermissionEntity} from "../../entity/user/PermissionEntity";
import {PermissionOperation} from "../../entity/user/PermissionOperation";
import {NextFunction, Request, Response} from "express";

export var settings: any;

export async function AuthPermission(req: Request, res: Response, next: NextFunction) {

    const entityManager = getManager();

    let entities = await entityManager.find(PermissionEntity);
    let operations = await entityManager.find(PermissionOperation);

    // console.log(entities);
    // console.log(operations);

    settings = {
        permissions: {
            entities,
            operations
        }
    };

    next();
}
