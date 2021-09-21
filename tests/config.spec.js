import { expect } from 'chai';
import ConfigHelper from '../helpers/config.helper';
import UsersHelper from '../helpers/users.helper';

describe('configuration', function() {

    let configHelper = new ConfigHelper();
    let userHelper = new UsersHelper();

    describe('get configuration', function () {

        before(async function () {
            await configHelper.getConfig();
        });

        it('status code is 200', function () {
            expect(configHelper.response.statusCode).to.eq(200);
        });

         it('response body contains number_of_entries', function() {
            expect(configHelper.response.body.number_of_entries).not.to.be.undefined;
        });

        it('response body contains initial_amount', function() {
            expect(configHelper.response.body.initial_amount).not.to.be.undefined;
        });
    });

    describe('delete configuration', function () {

        before(async function () {
            await configHelper.deleteConfig();
        });

        it('status code is 200', function () {
            expect(configHelper.response.statusCode).to.eq(200);
        });

        it('response body has success message', function() {
            expect(configHelper.response.body.message).to.eq('Data wiped out.');
        });
    });

    describe.skip('patch configuration', function () {
        let number_of_entries = Math.floor(Math.random() * 10) + 5;
        let initial_amount = Math.floor(Math.random() * 1000) + 1;

        before(async function () {
            await configHelper.getConfig();
            await configHelper.patchConfig(number_of_entries, initial_amount);
        });

        it('status code is 200', function () {
            expect(configHelper.response.statusCode).to.eq(200);
        });

        it('response body contains number_of_entries', function() {
            expect(configHelper.response.body.number_of_entries).to.eq(number_of_entries);
        });

        it('response body contains initial_amount', function() {
            expect(configHelper.response.body.initial_amount).to.eq(initial_amount);
        });

        it('response body contains number_of_entries', async function() {
            for await (const user of Array( number_of_entries + 1)) {
                await userHelper.createUser();
            }
            expect(userHelper.response.body.message).to.eq('Maximum number of users reached.');

        });
    });

    after(async function () {
        await configHelper.wipeData();
    });

});
