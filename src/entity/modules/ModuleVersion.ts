import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Module} from "./Module";
import {IModule, IModuleVersion} from "../../models/entity/IModule";

@Entity()
export class ModuleVersion {

    constructor(id?: number) {
        id && (this.id = id);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Module, module => module.version)
    @JoinColumn({ name: "module_id" })
    module: Module;

    @Column()
    version: string;

    public load(module: IModule) {
        let versionArr: any[] = [];

        module.version && module.version.map((item: IModuleVersion) => {
          let $this = new ModuleVersion();
          $this.module = new Module(module.id);
          $this.version = item.version;

          versionArr.push($this);
        });

        return versionArr;
    }
}

