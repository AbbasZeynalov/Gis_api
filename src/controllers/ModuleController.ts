import BaseController from "./BaseController";
import ModuleBll from "../bll/ModuleBll";
import {IContext} from "../models/graphql/IGraphql";
import {getCustomRepository} from "typeorm";
import ModuleRepository from "../dal/ModuleRepository";
import ModuleVersionRepository from "../dal/ModuleVersionRepository";
import {Module} from "../entity/modules/Module";

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

            let model = new Module();

            if(args.hasOwnProperty('offset')) {
                model.pagination.offset = args.offset;

            }

            if(args.hasOwnProperty('limit')) {
                model.pagination.limit = args.limit;
            }

            console.log('heeeeeeeeeeeeeeeeeeeee ')

            let data = await this.bll.getModules(model);

            return model.loadReturnDataWithPagination(data);

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
