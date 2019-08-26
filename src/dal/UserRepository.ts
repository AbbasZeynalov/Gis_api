import {EntityRepository, Repository, createConnection, getCustomRepository} from "typeorm";
import {User} from "../entity/user/User";
import {IUser} from "../models/entity/IUser";
import {ON_OFF_STATUS} from "../config/constant";

@EntityRepository(User)
export default class UserRepository extends Repository<IUser> {

    async findByUserName(userName: string): Promise<IUser> {

        return await this.findOne({
            user_name: userName,
            active: ON_OFF_STATUS.ON
        }) || {} as IUser;
    }

    public async findById(id: number): Promise<IUser> {

        return await this.findOne(
            {
                id,
                active: ON_OFF_STATUS.ON
            },
            {
                select: ['id'],
                relations: ["userPermissions", "userPermissions.permissionOperation", "userPermissions.permissionEntity",]
            }
        ) || {} as IUser;
    }
}
