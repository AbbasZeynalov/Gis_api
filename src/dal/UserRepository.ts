import {EntityRepository, Repository, createConnection, getCustomRepository} from "typeorm";
import {User} from "../entity/User";
import {IUser} from "../models/entity/IUser";
import {ON_OFF_STATUS} from "../config/constant";

@EntityRepository(User)
export default class UserRepository extends Repository<IUser> {

    async findByEmail(email: string): Promise<IUser> {

        return await this.findOne({
            email: email,
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
                select: [ 'id', 'first_name' ],
                relations: ["role"]
            }
        ) || {} as IUser;
    }
}
