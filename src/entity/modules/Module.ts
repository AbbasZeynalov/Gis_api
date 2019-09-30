import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import {CustomBaseEntity} from "../CustomBaseEntity";
import {IModule} from "../../models/entity/IModule";
import {ModuleVersion} from "./ModuleVersion";
import {IUser} from "../../models/entity/IUser";

@Entity()
export class Module extends CustomBaseEntity implements IModule {

    constructor(id?: number) {
        super();
        id && (this.id = id);
    }

    @Column()
    name: string;

    @Column()
    url: string;

    @OneToMany(type => ModuleVersion, moduleVersion => moduleVersion.module)
    version: ModuleVersion[];

    public loadReturnDataWithPagination(data: any) {

        return {
            items: data[0],
            totalCount: data[1]
        }
    }

    load(items: any) {

        let moduleArr: any[] = [];

        items.forEach((item: any) => {
            let $this = new Module();
            $this.name = item.name;
            $this.url = item.url;
            $this.version = item.version;

            moduleArr.push($this)
        });

        return moduleArr;
    }

}

