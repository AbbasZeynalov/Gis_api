import {ICustomBaseEntity, Pagination} from "./ICustomBaseEntity";
import {INSTALL_STATUS} from "../../config/constant";

export interface IModule extends ICustomBaseEntity{
    name: string
    uuid: string
    git_deploy_token_username: string
    git_deploy_token_password: string
    url: string
    install: INSTALL_STATUS
    version: IModuleVersion[]
    pagination: Pagination;
}

export interface IModuleVersion {
    version: string
}
