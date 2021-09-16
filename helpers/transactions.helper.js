import supertest from 'supertest';
import UsersHelper from './users.helper';
import ConfigHelper from '../helpers/config.helper';

let configHelper = new ConfigHelper();
let userHelper = new UsersHelper();

class TransactionsHelper {

    constructor() {
        this.response = null;
        this.id1 = null;
        this.id2 = null;
    }

    async createTrans(id1, id2, amount) {
        await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .send({
                from: id1,
                to: id2,
                amount: amount
            })
            .then((res) => {
                this.response = res;
            });
    }

    async createManyTrans(n) {
        for await (const user of Array(n)) {
            await userHelper.createUser();
            this.id1 = userHelper.response.body.id;
            await userHelper.createUser();
            this.id2 = userHelper.response.body.id;
            await configHelper.getConfig();
            await this.createTrans(this.id1, this.id2, configHelper.amount);
        }
    }

    async getAllTrans() {
        await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }

    async getSpecificTrans(id) {
        await supertest(process.env.BASE_URL)
            .get(`/transactions?id=${id}`)
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }

}

export default TransactionsHelper;
