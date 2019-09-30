import {EntityManager, EntityRepository, getConnection, Repository} from "typeorm";
import {IModuleVersion} from "../models/entity/IModule";
import {ModuleVersion} from "../entity/modules/ModuleVersion";

@EntityRepository(ModuleVersion)
export default class ModuleVersionRepository extends Repository<IModuleVersion>{
    saveModuleVersions(data: any[], transactionalEntityManager?: EntityManager) {

        let connection = transactionalEntityManager ? transactionalEntityManager : getConnection();

        return connection
            .createQueryBuilder()
            .insert()
            .into(ModuleVersion)
            .values(data)
            .execute();
    }
}
