import {Connection, createConnection} from "typeorm";

export default class Db {

    _connection: Connection;

    async connect() {

        this._connection = await createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "",
            "database": "gis_settings",
            "synchronize": true,
            "entities": [
                "src/core-settings//entity**/*.ts"
            ],
        });

        return this._connection;
    }

    public async close() {

        await this._connection.close();
    }
}
