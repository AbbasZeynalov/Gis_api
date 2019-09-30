import {EntityRepository, Repository, getConnection, EntityManager} from "typeorm";
import {IUserPermissions} from "../models/entity/IUser";
import {UserPermissions} from "../entity/user/UserPermissions";

@EntityRepository(UserPermissions)
export default class UserPermissionsRepository extends Repository<IUserPermissions> {

    saveUserPermissions(data: IUserPermissions[], transactionalEntityManager?: EntityManager) {

        let connection = transactionalEntityManager ? transactionalEntityManager : getConnection();

        return connection
            .createQueryBuilder()
            .insert()
            .into(UserPermissions)
            .values(data)
            .execute();
    }
}
