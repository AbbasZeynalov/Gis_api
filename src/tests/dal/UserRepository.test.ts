import * as chai from 'chai';
import 'mocha';
import UserRepository from "../../dal/UserRepository";
import {createConnection, getCustomRepository} from "typeorm";

const assert = chai.assert;
const expect = chai.assert;

describe('UserRepository ', async  () => {

    let userRepo: UserRepository;

    before(async function() {
        await createConnection();

        userRepo = getCustomRepository(UserRepository);
    });

    it('should return empty', async () => {

        const result = await userRepo.findByUserName('xxxxxxxx');

        assert.deepEqual(result, {});
    });

    it('should return user', async () => {

        const result = await userRepo.findByUserName('abbas');

        assert.property(result, 'id');
        assert.property(result, 'firstname');
        assert.property(result, 'lastname');
    });

});
