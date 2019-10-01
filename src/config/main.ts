import {ConnectionOptions} from "typeorm";

export const getDbSettings = (url: string): ConnectionOptions  => {

    return {
        "url": url,
        "type": "mysql",
        "synchronize": true,
        "logging": false,
        "entities": [
            "../entity/*"
        ],
        "migrations": [
            "../migration/*"
        ],
        "subscribers": [
            "../subscriber/*"
        ],
    }
};
