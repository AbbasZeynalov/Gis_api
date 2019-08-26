import {ON_OFF_STATUS} from "../../config/constant";

export interface ICustomBaseEntity {
    id: number;
    created_date: Date;
    updated_date: Date;
    created_by: number;
    updated_by: number;
    active: ON_OFF_STATUS;
    // load: (obj: any) => any;
    // schema: (obj: any) => any;
}
