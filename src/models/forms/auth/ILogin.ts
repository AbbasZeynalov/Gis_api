import {IEntityValidation} from "../../validation/IEntity";

export interface ILogin extends IEntityValidation{
    email: string
    password: string
}
