import {EntityRepository, Repository} from "typeorm";
import {Module} from "../entity/modules/Module";
import {IModule} from "../models/entity/IModule";

@EntityRepository(Module)
export default class ModuleRepository extends Repository<IModule>{

}
