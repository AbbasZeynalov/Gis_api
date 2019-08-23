import AuthBll from '../bll/AuthBll';
import BaseController from "./BaseController";
import LoginForm from "../entity/LoginForm";
import {User} from "../entity/user/User";
import Authentication from "../decorators/auth/Authentication";
import Rbac from "../decorators/auth/Rbac";
import {IUser} from "../models/entity/IUser";
import {IContext} from "../models/graphql/IGraphql";
import {USER_ROLES} from "../config/constant";
import {ILogin} from "../models/forms/auth/ILogin";

export default class AuthController extends BaseController {
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll();

        this.me = this.me.bind(this);
        this.actionLogin = this.actionLogin.bind(this);
        this.actionRegister = this.actionRegister.bind(this);
    }

    @Authentication
    // @Rbac([2, 5])
    public async me(args: any, context: IContext): Promise<any> {

        try {
            console.log('f user: ', context.req.user);

            return {
                id: 11,
                first_name: 'test',
                last_name: 'String',
                email: 'String',
                access_token: 'String'
            }

        } catch (e) {

            console.log('me: C ', e);
            this.logger.error(e);
        }
    }

    /**
     *
     * @param args
     * @param context
     */
    @Authentication
    // @Rbac([USER_ROLES.VIEWER, USER_ROLES.EXPERT, USER_ROLES.ADMIN])
    public async actionRegister(args: IUser, context: IContext) {
        try {
            let model = new User();

            model.load(args);

            this.validate(model, model.schema());

            // console.log('user model ', model)

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
