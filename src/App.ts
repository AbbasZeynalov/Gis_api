import {Err} from "joi";

require('dotenv').config();
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection, getManager} from "typeorm";
import GraphqlHttp from "./graphql/root/GraphqlHttp";
const crypto = require('crypto');
import {AuthPermission} from "./components/settings/AuthPermission";
import {rejects} from "assert";
import {deCipher} from "./utils/Crypto";
import {SocketConnectOpts, TcpSocketConnectOpts} from "net";
import {Customer} from "./core-settings/entity/Customer";

var mysql = require('mysql');

class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.init();
    }

    public async init() {

        let conn = await createConnection({
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

        const entityManager = getManager();

        const customer = await entityManager.findOne(Customer) || {} as Customer;

        console.log('customer: ',customer);


        let connection = deCipher(customer.db_conn_secret, customer.key);

        console.log(connection);

        await conn.close();

        this.config();

        await createConnection({
            // "database": "gis",
            // "url": "host=localhost,port=3306,database=gis,username=root,password=''",
            "url": connection,
            // "url": 'mysql://root:@localhost/gis',

                "type": "mysql",
                // "host": "localhost",
                // "port": 3306,
                // "username": "root",
                // "password": "",
                "synchronize": true,
                "logging": false,
                "entities": [
                    "src/entity/**/*.ts"
                ],
                "migrations": [
                    "src/migration/**/*.ts"
                ],
                "subscribers": [
                    "src/subscriber/**/*.ts"
                ]
            }
        );

        this.app.use('/graphql', cors(), AuthPermission, GraphqlHttp());
    }

    private config(): void {

        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
            next();
        });

        this.app.use(bodyParser.json());   // support application/json type post data

        this.app.use(bodyParser.urlencoded({extended: false}));  //support application/x-www-form-urlencoded post data
    }
}

export default new App().app;
