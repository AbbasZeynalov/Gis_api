import UserRepository from "../../dal/UserRepository";
import {getCustomRepository} from "typeorm";
import BaseController from "../../controllers/BaseController";
import {UnauthorizedError} from "type-graphql";
import Logger from "../../utils/logger";
const jwt = require('jsonwebtoken');

export default function Authentication(target: BaseController, name: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;

    if (typeof original === 'function') {

        descriptor.value = async function (...args: any) {
            let ctx = args[1];
            const userRepository = getCustomRepository(UserRepository);

            try {
                let authStr = ctx.req.get('Authorization');

                // TODO replace with jwt split
                let token = authStr.split(' ')[1];
                let userJWT = jwt.verify(token, process.env.AUTH_SECRET);

                ctx.req.user = await userRepository.findById(userJWT.id);

                // console.log('user -------------------------- ', ctx.req.user)

                return original.apply(this, args);

            } catch (e) {
                (new Logger()).error(e);
                throw new UnauthorizedError();
            }
        }
    }
    return descriptor;
};
