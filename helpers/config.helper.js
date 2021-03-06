import supertest from 'supertest';

class ConfigHelper {
    constructor() {
        this.response = null;
        this.amount = null;
    }

    async wipeData() {
        await supertest(process.env.BASE_URL)
            .delete('/config')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }

    async getConfig() {
        await supertest(process.env.BASE_URL)
            .get('/config')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
                this.amount = Math.floor(Math.random() * this.response.body.initial_amount);
            });
    }

    async deleteConfig() {
        await supertest(process.env.BASE_URL)
            .delete('/config')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }

    async patchConfig(new_entries, new_amount) {
        await supertest(process.env.BASE_URL)
            .patch('/config')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .send({
                number_of_entries: new_entries,
                initial_amount: new_amount
            })
            .then((res) => {
                this.response = res;
            });
    }
}

export default ConfigHelper;
