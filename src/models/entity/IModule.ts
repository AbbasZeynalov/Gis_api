import {ICustomBaseEntity} from "./ICustomBaseEntity";

export interface IModule extends ICustomBaseEntity{
    name: string
    url: string
    version?: IModuleVersion[]
}

export interface IModuleVersion {
    version: string
}
