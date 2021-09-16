import { expect } from 'chai';
import TransactionsHelper from '../helpers/transactions.helper';
import ConfigHelper from '../helpers/config.helper';
import UsersHelper from '../helpers/users.helper';

describe('transactions', function () {
    let transactionsHelper = new TransactionsHelper();
    let configHelper = new ConfigHelper();
    let userHelper = new UsersHelper();
    let id1 = null;
    let id2 = null;
    let amount = null;

    describe('create transactions', function () {

        before(async function () {
            await userHelper.createUser();
            id1 = userHelper.response.body.id;
            await userHelper.createUser();
            id2 = userHelper.response.body.id;
            await configHelper.getConfig();
            amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
            await transactionsHelper.createTrans(id1, id2, amount);
        });

        it('status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains id',  function() {
            expect(transactionsHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount',  function() {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });

        it('response body contains "from" equal id1',  function() {
            expect(transactionsHelper.response.body.from).to.eq(id1);
        });

        it('response body contains "to" equal id2',  function() {
            expect(transactionsHelper.response.body.to).to.eq(id2);
        });
    });

    describe('get all transactions', function () {

        before(async function () {
            for await (const user of Array(3)) {
                await userHelper.createUser();
                id1 = userHelper.response.body.id;
                await userHelper.createUser();
                id2 = userHelper.response.body.id;
                await configHelper.getConfig();
                amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
                await transactionsHelper.createTrans(id1, id2, amount);
            }
            await transactionsHelper.getAllTrans();
        });

        it('status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains at least 3 transactions', function() {
            expect(transactionsHelper.response.body.length).to.be.at.least(3);
        });

        it('response body contains "id"',  function() {
            expect(transactionsHelper.response.body.map(({id}) => id)).not.to.be.undefined;
        });

        it('response body contains "amount"',  function() {
            expect(transactionsHelper.response.body.map(({amount}) => amount)).not.to.be.undefined;
        });

        it('response body contains "from"',  function() {
            expect(transactionsHelper.response.body.map(({from}) => from)).not.to.be.undefined;
        });

        it('response body contains "to"',  function() {
            expect(transactionsHelper.response.body.map(({to}) => to)).not.to.be.undefined;
        });
    });

    describe('get specific transaction', function() {

        before(async function() {
            await userHelper.createUser();
            id1 = userHelper.response.body.id;
            await userHelper.createUser();
            id2 = userHelper.response.body.id;
            await configHelper.getConfig();
            amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
            await transactionsHelper.createTrans(id1, id2, amount);
            await transactionsHelper.getSpecificTrans(transactionsHelper.response.body.id);
        });

        it('response code is 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function() {
            expect(transactionsHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function() {
            expect(transactionsHelper.response.body.amount).not.to.be.undefined;
        });
    });

    after(async function () {
        await configHelper.wipeData();
    });

});
