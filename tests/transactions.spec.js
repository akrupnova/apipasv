import { expect } from 'chai';
import TransactionsHelper from '../helpers/transactions.helper';
import ConfigHelper from '../helpers/config.helper';
import UsersHelper from '../helpers/users.helper';

describe('transactions', function () {
    let transactionsHelper = new TransactionsHelper();
    let configHelper = new ConfigHelper();
    let userHelper = new UsersHelper();
    let idFrom = null;
    let idTo = null;
    let amount = null;
    let amountFrom = null;
    let amountTo = null;

    describe.skip('create transactions', function () {

        before(async function () {
            await userHelper.createUser();
            idFrom = userHelper.response.body.id;
            amountFrom = userHelper.response.body.amount;
            await userHelper.createUser();
            idTo = userHelper.response.body.id;
            amountTo = userHelper.response.body.amount;
            await configHelper.getConfig();
            amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
            await transactionsHelper.createTrans(idFrom, idTo, amount);
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

        it('response body contains "from" equal idFrom',  function() {
            expect(transactionsHelper.response.body.from).to.eq(idFrom);
        });

        it('response body contains "to" equal idTo',  function() {
            expect(transactionsHelper.response.body.to).to.eq(idTo);
        });

        it('amount of userFrom became less by amount transaction', async function() {
            await userHelper.getAllUsers();
            expect(userHelper.response.body.find(({id}) => id === idFrom).amount).to.eq(amountFrom - amount);
        });

        it('amount of userTo became more by amount transaction', async function() {
            expect(userHelper.response.body.find(({id}) => id === idTo).amount).to.eq(amountTo + amount);
        });
    });

    describe('get all transactions', function () {

        before(async function () {
            for await (const user of Array(3)) {
                await userHelper.createUser();
                idFrom = userHelper.response.body.id;
                await userHelper.createUser();
                idTo = userHelper.response.body.id;
                await configHelper.getConfig();
                amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
                await transactionsHelper.createTrans(idFrom, idTo, amount);
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
            idFrom = userHelper.response.body.id;
            await userHelper.createUser();
            idTo = userHelper.response.body.id;
            await configHelper.getConfig();
            amount = Math.floor(Math.random() * configHelper.response.body.initial_amount);
            await transactionsHelper.createTrans(idFrom, idTo, amount);
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
