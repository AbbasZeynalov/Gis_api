import AuthBll from '../bll/AuthBll';
import BaseController from "./BaseController";
import LoginForm from "../entity/LoginForm";
import {User} from "../entity/user/User";
import Authentication from "../decorators/auth/Authentication";
import {IUser} from "../models/entity/IUser";
import {IContext} from "../models/graphql/IGraphql";
import {ILogin} from "../models/forms/auth/ILogin";
import Rbac from "../decorators/auth/Rbac";
import {AUTH_ENTITIES, AUTH_OPERATIONS} from "../config/constant";
import {getCustomRepository} from "typeorm";
import UserRepository from "../dal/UserRepository";
import UserPermissionsRepository from "../dal/UserPermissionsRepository";

export default class AuthController extends BaseController {
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll(getCustomRepository(UserRepository), getCustomRepository(UserPermissionsRepository));

        this.me = this.me.bind(this);
        this.actionLogin = this.actionLogin.bind(this);
        this.actionRegister = this.actionRegister.bind(this);
    }

    @Authentication
    // @Rbac([2, 5])
    public async me(args: any, context: IContext): Promise<any> {

        try {

            return {
                id: 11,
                first_name: 'test',
                last_name: 'String',
                email: 'String',
                access_token: 'String'
            }

        } catch (e) {

            this.logger.error(e);
        }
    }

    /**
     *
     * @param args
     * @param context
     */
    @Authentication
    @Rbac({
        [AUTH_ENTITIES.PARCEL]: [AUTH_OPERATIONS.CREATE, AUTH_OPERATIONS.DELETE],
        [AUTH_ENTITIES.USER]: [AUTH_OPERATIONS.CREATE]
    })
    public async actionRegister(args: IUser, context: IContext) {
        try {
            let model = new User();

            model.load(args);

            this.validate(model, model.schema());

            return await this.bll.register(model);

        } catch (e) {
            return this.catchError(e);
        }
    }

    public async actionLogin(args: ILogin, context: IContext) {

        try {
            let model = new LoginForm();

            model.load(args);

            this.validate(model, model.schema());

            return await this.bll.login(model);

        } catch (e) {
            return this.catchError(e);
        }
    }
}
