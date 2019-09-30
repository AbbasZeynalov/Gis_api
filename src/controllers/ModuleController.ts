import BaseController from "./BaseController";
import ModuleBll from "../bll/ModuleBll";
import {IContext} from "../models/graphql/IGraphql";
import {getCustomRepository} from "typeorm";
import ModuleRepository from "../dal/ModuleRepository";
import ModuleVersionRepository from "../dal/ModuleVersionRepository";

export default class ModuleController extends BaseController {
    protected bll: ModuleBll;

    constructor() {
        super();

        this.bll = new ModuleBll(getCustomRepository(ModuleRepository), getCustomRepository(ModuleVersionRepository));
        this.actionGetModules = this.actionGetModules.bind(this);
        this.actionSynchronize = this.actionSynchronize.bind(this);
    }

    public async actionGetModules(args: any, context: IContext) {
        try {

            let pagination = {
                offset: 0,
                limit: 0
            };

            if(args.hasOwnProperty('offset')) {
                pagination.offset = args.offset;
            }

            if(args.hasOwnProperty('limit')) {
                pagination.limit = args.limit;
            }

            let res = await this.bll.getModules(pagination);

            return res.data.data.modules;

        } catch (e) {
            return this.catchError(e);
        }
    }

    public async actionSynchronize() {
        try {
            await this.bll.synchronize();

            return {
                success: true
            }
        } catch (e) {
            return this.catchError(e);
        }
    }
};
