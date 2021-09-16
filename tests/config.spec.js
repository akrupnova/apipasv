import { expect } from 'chai';
import ConfigHelper from '../helpers/config.helper';

describe('configuration', function() {

    let configHelper = new ConfigHelper();

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

        before(async function () {
            await configHelper.getConfig();
            await configHelper.patchConfig();
        });

        it('status code is 200', function () {
            expect(configHelper.response.statusCode).to.eq(200);
        });

        it('response body contains number_of_entries', function() {
            expect(configHelper.response.body.number_of_entries).not.to.be.undefined;
        });
    });

    after(async function () {
        await configHelper.wipeData();
    });

});
