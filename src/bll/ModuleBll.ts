import Axios from "axios";
import ModuleRepository from "../dal/ModuleRepository";
import {getManager} from "typeorm";
import {Module} from "../entity/modules/Module";
import {ModuleVersion} from "../entity/modules/ModuleVersion";
import ModuleVersionRepository from "../dal/ModuleVersionRepository";
import {IModule} from "../models/entity/IModule";

export default class ModuleBll {
    public moduleDal: ModuleRepository;
    public moduleVersionDal: ModuleVersionRepository;

    constructor(ModuleRepository: ModuleRepository, ModuleVersionRepository: ModuleVersionRepository) {
        this.moduleDal = ModuleRepository;
        this.moduleVersionDal = ModuleVersionRepository;
    }

    public async getModulesFromCore(pagination: any): Promise<any> {
        let query = ` query {
              modules(offset: ${pagination.offset}, limit: ${pagination.limit}) {
                items {
                    name,
                    uuid, 
                    git_deploy_token_username, 
                    git_deploy_token_password, 
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

    public async getModules(model: IModule): Promise<[IModule[], number]> {

        return await this.moduleDal.findAndCount({
            skip: model.pagination.offset,
            take: model.pagination.limit,
            relations: ["version"]
        });
    }

    public async synchronize() {
        let pagination = {
            offset: 0,
            limit: 0
        };

        let model = new Module();

        let response = await this.getModulesFromCore(pagination);

        if (response.status === 200) {
            let modules = model.load(response.data.data.modules.items);

            await this.saveModules(modules)
        }
    }

    private async saveModules(modules: any) {
        let existModules = await this.moduleDal.getModules();

        await getManager().transaction(async transactionalEntityManager => {

            for (let newModule of modules) {
                let existModule = existModules.find((existModule) => newModule.uuid === existModule.uuid);
                let isUpdate = existModule &&
                            (
                                existModule.name !== newModule.name  ||
                                existModule.url !== newModule.url ||
                                (existModule.version && existModule.version.length) != newModule.version.length ||
                                existModule.git_deploy_token_username != newModule.git_deploy_token_username ||
                                existModule.git_deploy_token_password != newModule.git_deploy_token_password
                            );

                if (!existModule) {
                    await this.saveNewModule(newModule, transactionalEntityManager);

                } else if (isUpdate){
                    await this.updateModule(existModule, newModule, transactionalEntityManager)
                }
            }
        });
    }

    private async saveNewModule(newModule: IModule, transactionalEntityManager: any) {
        let moduleVersion = new ModuleVersion();
        await transactionalEntityManager.save(newModule);

        if (newModule.version.length > 0) {
            let versions = moduleVersion.load(newModule);

            await this.moduleVersionDal.saveModuleVersions(versions)
        }
    }

    private async updateModule(existModule: IModule, newModule: IModule, transactionalEntityManager: any) {
        existModule.name = newModule.name;
        existModule.url = newModule.url;
        existModule.git_deploy_token_username = newModule.git_deploy_token_username;
        existModule.git_deploy_token_password = newModule.git_deploy_token_password;
        await transactionalEntityManager.save(existModule);

        if ((existModule.version && existModule.version.length) != newModule.version.length) {
            let moduleVersion = new ModuleVersion();
            existModule.version = newModule.version;
            let newVersions = moduleVersion.load(existModule);

            await this.moduleVersionDal.updateModuleVersions(newVersions, existModule.id)
        }
    }
};
