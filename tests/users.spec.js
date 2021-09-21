import { expect } from 'chai';
import UsersHelper from '../helpers/users.helper';
import { getRandomItem } from '../helpers/common.helper';
import ConfigHelper from '../helpers/config.helper';


describe.only( 'users', function() {
    let userHelper = new UsersHelper();
    let configHelper = new ConfigHelper();

    describe('user creation', function () {
        before(async function (){
            await userHelper.createUser();
        });

        it('response status code is 200',  function() {
            expect(userHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id',  function() {
            expect(userHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount',  function() {
            expect(userHelper.response.body.amount).not.to.be.undefined;
        });
    });

    describe('user deletion', function () {

        before(async function () {
            await userHelper.createUser();
            await userHelper.deleteUser(userHelper.response.body.id);
        });

        it('response code is 200', function() {
            expect(userHelper.response.statusCode).to.eq(200);
        });

        it('response body has success message', function() {
            expect(userHelper.response.body.message).to.eq('User deleted.');
        });
    });

    describe('get all users', function() {

        before(async function() {
            for await (const user of Array(3)){
                await userHelper.createUser();
            }
            await userHelper.getAllUsers();
        });

        it('response code is 200', function() {
            expect(userHelper.response.statusCode).to.eq(200);
        });

        it('response body contains at least 3 users', function() {
            expect(userHelper.response.body.length).to.be.at.least(3);
        });

        it('response body contains user id', function() {
            expect(getRandomItem(userHelper.response.body).id).not.to.be.undefined;
        });

        it('response body contains amount', function() {
            expect(getRandomItem(userHelper.response.body).amount).not.to.be.undefined;
        });
    });

    describe('get specific user', function() {

        before(async function() {
            await userHelper.createUser();
            await userHelper.getSpecificUser(userHelper.response.body.id);
        });

        it('response code is 200', function() {
            expect(userHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function() {
            expect(userHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function() {
            expect(userHelper.response.body.amount).not.to.be.undefined;
        });
    });

    after(async function () {
        await configHelper.wipeData();
    });
});
