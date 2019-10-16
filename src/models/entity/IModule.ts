import {ICustomBaseEntity, Pagination} from "./ICustomBaseEntity";

export interface IModule extends ICustomBaseEntity{
    name: string
    url: string
    version?: IModuleVersion[]
    pagination: Pagination;
}

export interface IModuleVersion {
    version: string
}
