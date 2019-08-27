import {PermissionEntity} from "../../entity/user/PermissionEntity";
import {PermissionOperation} from "../../entity/user/PermissionOperation";

export let APP_SETTINGS: any = {
    auth: {
        entities: [],
        operations: []
    }
};

// export function setAuth(entities: any) {
//     let t = entities.map((entity: PermissionEntity) => {
//
//         return {
//             [entity.name]: entity.id
//         };
//     });
// }
//
// export let SETTINGS_ENTITIES: any = [];
// export let SETTINGS_OPERATIONS: any = [];

export default class Settings {

    get getAuthEntities() {

        return APP_SETTINGS.auth.entities;
    }

    get getAuthOperations() {

        return APP_SETTINGS.auth.operations;
    }

    set setAuthEntities(entities: PermissionEntity[]) {

        APP_SETTINGS.auth.entities = entities.map((entity: PermissionEntity) => {

            return {
                [entity.name]: entity.id
            };
        });

        // APP_SETTINGS = {
        //     auth: {
        //         entities: t
        //     }
        // }
    }

    set setAuthOperations(operations: PermissionOperation[]) {

        APP_SETTINGS.auth.operations = operations.map((operation: PermissionOperation) => {

            return {
                [operation.name]: operation.id
            };
        });
    }
}
