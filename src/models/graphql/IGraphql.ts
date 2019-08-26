import {Request, Response} from "express";
import {IUser} from "../entity/IUser";

export interface IControllerArgs {
    args: any,
    context: IContext
}

export interface IContext {
    req: IRequest,
    res: Response
}

export interface IRequest extends Request {
    user?: IUser,
    settings?: {
        permissions: any
    }
}
