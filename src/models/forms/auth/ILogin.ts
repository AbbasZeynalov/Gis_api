import {IEntityValidation} from "../../validation/IEntity";

export interface ILogin extends IEntityValidation{
    username: string
    password: string
}
