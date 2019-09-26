import {getCustomRepository} from "typeorm";
import CustomerRepository from "./dal/CustomerRepository";
import {deCipher} from "../utils/crypto";
import Db from "./config/Db";
import Logger from "../utils/logger";

export default class CoreSettings extends Db {

    logger: Logger;

    constructor(logger: Logger) {

        super();

        this.logger = logger;
    }

    async getDbConnStr(): Promise<any> {

        try {
            await this.connect();

            let customerRepository = getCustomRepository(CustomerRepository);

            let customer = await customerRepository.getCustomer();

            let connStr = deCipher(customer.db_conn_secret, customer.key);

            await this.close();

            return connStr;
        }
        catch (e) {

            await this.close();

            this.logger.error(e);
        }
    }

    async getAppPort(): Promise<any> {

        return 3200;
    }
}
