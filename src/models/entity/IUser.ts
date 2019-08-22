import {ON_OFF_STATUS} from "../../config/constant";
import {IRole} from "./IRole";
import {IEntityValidation} from "../validation/IEntity";

export interface IUser {
    id: number
    user_name: string
    first_name: string
    last_name: string
    patronymic: string
    email: string
    password: string
    password_repeat?: string
    access_token?: string
    created_date: Date
    updated_date: Date
    active: ON_OFF_STATUS
    role: IRole[]
}
