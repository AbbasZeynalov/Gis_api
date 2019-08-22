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

interface IRequest extends Request {
    user?: IUser
}
