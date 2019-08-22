import {IRole} from "../../models/entity/IRole";
import Logger from "../../utils/logger";
import {UnauthorizedError} from "type-graphql";

export default function Rbac(rolesId: number[]) {

    return function decorator(t: any, n: any, descriptor: any) {
        const original = descriptor.value;

        if (typeof original === 'function') {

            try {
                descriptor.value = function (...args: any) {
                    let ctx = args[1];
                    let auth = false;

                    ctx.req.user.role.forEach((role: IRole) => {
                        if(rolesId.includes(role.id))
                            auth = true;
                    });

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
