import {ConnectionOptions} from "typeorm";

export const getDbSettings = (url: string): ConnectionOptions  => {

    return {
        "url": url,
        "type": "mysql",
        "synchronize": true,
        "logging": true,
        "entities": [
            "src/entity/**/*.ts"
        ],
        "migrations": [
            "src/migration/**/*.ts"
        ],
        "subscribers": [
            "src/subscriber/**/*.ts"
        ],
    }
};
