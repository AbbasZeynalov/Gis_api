import {ConnectionOptions} from "typeorm";
const path = require('path');

export const getDbSettings = (url: string): ConnectionOptions  => {

    // @ts-ignore
    let appDir = path.dirname(require.main.filename);
console.log(url);
    return {
        "url": url,
        "type": "mysql",
        "synchronize": true,
        "logging": false,
        "entities": [
            appDir+"/entity/**/*"
        ],
        "migrations": [
            "../migration/*"
        ],
        "subscribers": [
            "../subscriber/*"
        ],
    }
};
