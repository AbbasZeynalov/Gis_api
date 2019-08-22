import AuthController from "../../controllers/AuthController";

const GraphqlRoot = () => {

    const auth = new AuthController();

    return {
        me: auth.me,
        register: auth.actionRegister,
        login: auth.actionLogin
    }
};



export default GraphqlRoot;
