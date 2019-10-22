import {ICustomBaseEntity, Pagination} from "./ICustomBaseEntity";

export interface IModule extends ICustomBaseEntity{
    name: string
    uuid: string
    git_deploy_token_username: string
    git_deploy_token_password: string
    url: string
    version: IModuleVersion[]
    pagination: Pagination;
}

export interface IModuleVersion {
    version: string
}
