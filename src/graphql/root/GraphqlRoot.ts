import AuthController from "../../controllers/AuthController";
import ModuleController from "../../controllers/ModuleController";

const GraphqlRoot = () => {

    const auth = new AuthController();
    const module = new ModuleController();

    return {
        me: auth.me,
        register: auth.actionRegister,
        login: auth.actionLogin,
        modules: module.actionGetModules,
        synchronizeModules: module.actionSynchronize,
        activateModule: module.actionActivateModule,
    }
};

export default GraphqlRoot;
