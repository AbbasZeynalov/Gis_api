import {EntityRepository, Repository} from "typeorm";
import {Module} from "../entity/modules/Module";
import {IModule} from "../models/entity/IModule";
import {INSTALL_STATUS, ON_OFF_STATUS} from "../config/constant";

@EntityRepository(Module)
export default class ModuleRepository extends Repository<IModule>{
    constructor() {
        super();
        this.activateModule = this.activateModule.bind(this)
    }

    async getModules(): Promise<IModule[]> {

        return  this.find({
            where: {
                active: ON_OFF_STATUS.ON
            },
            relations: ["version"]
        });
    }

    async activateModule(id: number) {
        console.log(this);
        return this.update({ id }, {install: INSTALL_STATUS.ACTIVE})
    }
}
