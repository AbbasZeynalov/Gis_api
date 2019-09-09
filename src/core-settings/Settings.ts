import {getCustomRepository} from "typeorm";
import CustomerRepository from "./dal/CustomerRepository";
import {deCipher} from "../utils/Crypto";
import Db from "./config/Db";

export default class Settings extends Db {

    async getDbConnStr(): Promise<any> {

        try {
            await this.connect();

            let customerRepository = getCustomRepository(CustomerRepository);

            let customer = await customerRepository.getCustomer();

            let connStr = deCipher(customer.db_conn_secret+'z', customer.key);

            await this.close();

            return connStr;
        }
        catch (e) {

            await this.close();

            console.log(e.message);
        }
    }
}