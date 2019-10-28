import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import {CustomBaseEntity} from "../CustomBaseEntity";
import {IModule} from "../../models/entity/IModule";
import {ModuleVersion} from "./ModuleVersion";
import {IUser} from "../../models/entity/IUser";
import {Pagination} from "../../models/entity/ICustomBaseEntity";
import {DEFAULT_PAGINATION_LIMIT, INSTALL_STATUS, ON_OFF_STATUS} from "../../config/constant";

@Entity()
export class Module extends CustomBaseEntity implements IModule {

    constructor(id?: number) {
        super();
        id && (this.id = id);
    }

    @Column()
    name: string;

    @Column()
    uuid: string;

    @Column()
    git_deploy_token_username: string;

    @Column()
    git_deploy_token_password: string;

    @Column()
    url: string;

    @OneToMany(type => ModuleVersion, moduleVersion => moduleVersion.module)
    version: ModuleVersion[];

    @Column({
        type: "enum",
        enum: [INSTALL_STATUS.DEACTIVE, INSTALL_STATUS.ACTIVE],
        default: INSTALL_STATUS.DEACTIVE
    })
    install: INSTALL_STATUS;

    pagination: Pagination = {
        total: 0,
        offset: 0,
        limit: DEFAULT_PAGINATION_LIMIT
    };

    public loadReturnDataWithPagination(data: any) {

        return {
            items: data[0],
            totalCount: data[1]
        }
    }

    load(items: IModule[]) {

        let moduleArr: IModule[] = [];

        items.forEach((item: any) => {
            let $this = new Module();
            $this.name = item.name;
            $this.uuid = item.uuid;
            $this.git_deploy_token_username = item.git_deploy_token_username;
            $this.git_deploy_token_password = item.git_deploy_token_password;
            $this.url = item.url;
            $this.version = item.version;

            moduleArr.push($this)
        });

        return moduleArr;
    }

}

