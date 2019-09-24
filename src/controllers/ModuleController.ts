import BaseController from "./BaseController";
import Axios from "axios";
import ModuleBll from "../bll/ModuleBll";

export default class ModuleController extends BaseController {
    protected bll: ModuleBll;

    constructor() {
        super();

        this.bll = new ModuleBll();
        this.actionGetModules = this.actionGetModules.bind(this);
    }

    public async actionGetModules() {
        try {
            let modules: any = [];

            await this.bll.getModules().then(res => modules = res.data.data.modules);

            return modules;
        } catch (e) {

            return this.catchError(e);
        }
    }
};
