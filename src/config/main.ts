import {ConnectionOptions} from "typeorm";

export const getDbSettings = (url: string): ConnectionOptions  => {

    return {
        "url": url,
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
}