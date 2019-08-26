import {IEntityValidation} from "../../validation/IEntity";

export interface ILogin extends IEntityValidation{
    user_name: string
    password: string
}
