import Axios from "axios";
import ModuleRepository from "../dal/ModuleRepository";
import {getManager} from "typeorm";
import {Module} from "../entity/modules/Module";
import {ModuleVersion} from "../entity/modules/ModuleVersion";
import ModuleVersionRepository from "../dal/ModuleVersionRepository";

export default class ModuleBll {
    public moduleDal: ModuleRepository;
    public moduleVersionDal: ModuleVersionRepository;

    constructor(ModuleRepository: ModuleRepository, ModuleVersionRepository: ModuleVersionRepository) {
        this.moduleDal = ModuleRepository;
        this.moduleVersionDal = ModuleVersionRepository;
    }

    public async getModules(pagination: any): Promise<any> {
        let query = ` query {
              modules(offset: ${pagination.offset}, limit: ${pagination.limit}) {
                items {
                    name, 
                    url,
                    version {
                        version
                    }
                },
                totalCount
              }
            }`;

        return await Axios.get('http://localhost:3300/graphql', {params: {query}})
    };

    public async synchronize() {
        let pagination = {
            offset: 0,
            limit: 0
        };

        let model = new Module();

        let response = await this.getModules(pagination);
        let modules = model.load(response.data.data.modules.items);

        await getManager().transaction(async transactionalEntityManager => {

            for (let i = 0; i < modules.length; i++) {
                let currentModules = modules[i];
                let moduleVersion = new ModuleVersion();
                await transactionalEntityManager.save(currentModules);

                if (currentModules.version.length > 0) {
                    let versions = moduleVersion.load(currentModules);

                    this.moduleVersionDal.saveModuleVersions(versions)
                }
            }
        });
    }
};
