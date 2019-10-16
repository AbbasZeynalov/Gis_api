import {Connection, createConnection} from "typeorm"
import {Customer} from "../entity/Customer";
const path = require('path');


export default class Db {

    _connection: Connection;

    async connect() {

        // @ts-ignore
        // let appDir = path.dirname(require.main.filename);

        this._connection = await createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "",
            "database": "gis_settings",
            "synchronize": true,
            "entities": [
                // appDir+"/core-settings/entity/*"
                Customer
            ],
        });

        return this._connection;
    }

    public async close() {

        await this._connection.close();
    }
}
