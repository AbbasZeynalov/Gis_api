import * as chai from 'chai';
import 'mocha';
import UserRepository from "../../dal/UserRepository";
import AuthBll from "../../bll/AuthBll";
import UserPermissionsRepository from "../../dal/UserPermissionsRepository";
import {ILogin} from "../../models/forms/auth/ILogin";
import errors from "../../utils/response/errors";
var sinon = require('sinon');

const assert = chai.assert;
const expect = chai.expect;

describe.only('AuthBll ', async  () => {

    let bll: any;
    let stub1: any;
    let stub2: any;

    before(function() {

        stub1 = sinon.createStubInstance(UserRepository);
        stub2 = sinon.createStubInstance(UserPermissionsRepository);

        stub1.findByUserName.returns({password: '$2a$08$Wd4G5OzxcfWIat6L4IqyL.ltPqsHgt.FcychRbFRXG6R.GvEF7GTm', id: 2});

        bll = new AuthBll(stub1, stub2);


        process.env.AUTH_SECRET = 'xxx';
    });

    it('login success', async () => {

        let loginForm: ILogin = {
            username: 'abbas',
            password: '123456'
        };

        const result = await bll.login(loginForm);

        assert.hasAnyKeys(result, ['id', 'access_token']);

        assert.isString(result.access_token);

        expect(result.access_token).to.have.lengthOf.above(20);
    });

    it('login fail password is invalid', async () => {

        try {
            let loginForm: ILogin = {
                username: 'abbas',
                password: '123456x'
            };

            await bll.login(loginForm);
        }
        catch (e) {

            // assert.equal(e.code, errors.INVALID_AUTHENTICATION_CREDENTIALS);
            assert.equal(e.code, 1111111);
        }
    })

    it('login fail user not found', async () => {

        try {
            let loginForm: ILogin = {
                username: 'abbas',
                password: '123456'
            };

            stub1.findByUserName.returns({});

            await bll.login(loginForm);
        }
        catch (e) {

            assert.equal(e.code, errors.USER_NOT_FOUND);
        }
    })

});
