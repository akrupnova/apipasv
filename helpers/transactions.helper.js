import supertest from 'supertest';

class TransactionsHelper {

    constructor() {
        this.response = null;
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
