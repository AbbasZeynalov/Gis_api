import {createConnection, getCustomRepository} from "typeorm";
import {deCipher} from "../../utils/Crypto";
import CustomerFacade from "./CustomerFacade";
import CustomerRepository from "../dal/CustomerRepository";

export default class Settings {

    private connection: any;

    constructor() {

        let conn = createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "",
            "database": "gis_settings",
            "synchronize": true,
            "entities": [
                "src/core-settings/**/*.ts"
            ],
        });

        conn.then(() => {

            this.connection = conn;
        })
    }

    async connect() {


    }

    getConnStr = () => {

        let customerRepository = getCustomRepository(CustomerRepository);

        let deChiper = deCipher;

        return new CustomerFacade(customerRepository, deCipher);
    }
}