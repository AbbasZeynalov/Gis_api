import Logger from "../../utils/logger";
import {UnauthorizedError} from "type-graphql";
import BaseController from "../../controllers/BaseController";

export default function Rbac(permissions: any) {
    console.log('rbac');
    return function decorator(target: BaseController, name: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {

            try {
                descriptor.value = function (...args: any) {
                    let ctx = args[1];
                    let auth = false;
                    let userPermissions = ctx.req.user.userPermissions;

                    for (let userPermission of userPermissions) {

                        let entityId = userPermission.permissionEntity.id;
                        let operationId = userPermission.permissionOperation.id;
                        let operations = permissions[entityId];

                        if (permissions[entityId] && operations.includes(operationId)) {
                            auth = true;

                            break;
                        }
                    }

                    if(!auth)
                        throw new Error('Permission denied');

                    return original.apply(this, args);
                }
            }
            catch (e) {
                (new Logger()).error(e);
                throw new UnauthorizedError();
            }
        }
        return descriptor;
    };
}
