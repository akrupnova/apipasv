import express from 'express';
import bodyParser from 'body-parser';
import mockResponses from './responses.json';

function start (port){
    const app = express();
    let server;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/auth', async function(req, res) {
        const login = req.body.login;
        const password = req.body.password;
        if (login === process.env.LOGIN && password === process.env.PASSWORD)
            await res.status(200).send(mockResponses.auth.valid);
        else
            await res.status(404).send(mockResponses.auth.invalid);
    });

    app.post('/users', async function(req, res) {
    //    const token = req.header.Authorization.TOKEN;
        const token = undefined;
        if(token)
        await res.status(200).send(mockResponses.users.create.auth);
        else
            await res.status(404).send( mockResponses.users.create.unauth)
    });

    app.get('/users', async function(req, res) {
        const id = req.query.id;
        if (id)
            await res.status(200).send({
                "id": id,
                "amount": 1000
            });
        else await res.status(200).send(mockResponses.users.getAll);
    });

    app.get('/config', async function(req, res) {
        await res.status(200).send(mockResponses.config.get);
    });

    app.delete('/users', async function(req, res) {
        await res.status(200).send(mockResponses.users.delete);
    });

    app.delete('/config', async function(req, res) {
        await res.status(200).send(mockResponses.config.delete);
    });

    app.patch('/config', async function(req, res) {
        const number_of_entries = req.body.number_of_entries;
        const initial_amount = req.body.initial_amount;
        if (number_of_entries, initial_amount) {
            //   if(number_of_entries < 5 || number_of_entries > 25)
            //   await res.status(400).send('Number of entries must be between 5 and 25 (inclusively).');}
        } else await res.status(200).send(mockResponses.config.patch);
    });

    app.post('/transactions', async function(req, res) {
        const amount = req.body.amount;
        // const idFrom
        // const idTo
        await res.status(200).send(mockResponses.transactions.create);
    });

    app.get('/transactions', async function(req, res) {
        const id = req.query.id;
        if (id)
            await res.status(200).send({
                "id": "0b22010c-e805-4507-9b02-cdfb187abce7",
                "from": "bc82920e-54a7-4bf7-ba6f-cd1c2effa585",
                "to": "2496c30b-d740-4bb5-a4e6-c32a7c517226",
                "amount": 300
            });
        else await res.status(200).send(mockResponses.transactions.getAll);
    });

    before(async function() {
        server = await app.listen(port);
        console.log(`Mock server is running on port ${port}`);
    });

    after(function() {
        server.close();
    });
}

export { start };