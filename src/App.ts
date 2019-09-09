import {Err} from "joi";

require('dotenv').config();
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import GraphqlHttp from "./graphql/root/GraphqlHttp";

import {AuthPermission} from "./components/settings/AuthPermission";
import Settings from "./core-settings/Settings";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.init();
    }

    public async init() {

        let settings = new Settings();

        let connStr = await settings.getDbConnStr();

        this.config();

        await createConnection({
                "url": connStr,
                // "url": 'mysql://root:@localhost/gis',

                "type": "mysql",
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
