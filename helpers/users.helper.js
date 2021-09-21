import supertest from 'supertest';

class UsersHelper{
    constructor() {
        this.response = null;
        this.id = null;
    }

    async createUser(){
        await supertest(process.env.BASE_URL)
            .post('/users')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
                this.id = this.response.body.id;
            });
    }

    async deleteUser(id){
        await supertest(process.env.BASE_URL)
            .delete('/users')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .send({id: id})
            .then((res) => {
                this.response = res;
            });
    }

    async getAllUsers(){
        await supertest(process.env.BASE_URL)
            .get('/users')
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }

    async getSpecificUser(id){
        await supertest(process.env.BASE_URL)
            .get(`/users?id=${id}`)
            .set({ Authorization: `Bearer ${process.env.TOKEN}`})
            .then((res) => {
                this.response = res;
            });
    }
}

export default UsersHelper;
