import {EntityRepository, Repository} from "typeorm";
import {Module} from "../entity/modules/Module";
import {IModule} from "../models/entity/IModule";
import {ON_OFF_STATUS} from "../config/constant";

@EntityRepository(Module)
export default class ModuleRepository extends Repository<IModule>{
    async getModules(): Promise<IModule[]> {

        return  this.find({
            active: ON_OFF_STATUS.ON
        });
    }
}
