import supertest from 'supertest';
import { expect } from 'chai';

describe('auth', function (){
    //   const request = supertest(process.env.BASE_URL);
    let result;

    describe('successful log in', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
                .then((res) => {
                    result = res;
                });
        });

        it('response status code is 200', function() {
            expect(result.statusCode).to.eq(200);

        });

        it('response body contains authorization token', function() {
            expect(result.body.token).not.to.be.undefined;
        });
    });

    describe('log in with wrong credentials should return error', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: 'wrong', password: 'wrong' })
                .then((res) => {
                    result = res;
                });
        });

        it('response status code is 404', function() {
            expect(result.statusCode).to.eq(404);
        });

        it('response body contains error message', function() {

                expect(result.body.message).to.eq('Wrong login or password.');

        });
    });
});




// import supertest from 'supertest';
// import { expect } from 'chai';
//
// describe('auth', function (){
//  //   const request = supertest(process.env.BASE_URL);
//     let result;
//
//     describe('successful log in', function() {
//         before(function() {
//             result = supertest(process.env.BASE_URL)
//                 .post('/auth')
//                 .send({ login: process.env.LOGIN, password: process.env.PASSWORD });
//         });
//
//         it('response status code is 200', function() {
//             result.expect(200);
//            // expect(result.statusCode).to.eq(200);
//
//         });
//
//         it('response body contains authorization token', function() {
//             result.end(function(err, res) {
//                 expect(res.body.token).not.to.be.undefined;
//             });
//         });
//     });
//
//     describe('log in with wrong credentials should return error', function() {
//         before(function() {
//             result = supertest(process.env.BASE_URL)
//                 .post('/auth')
//                 .send({ login: 'wrong', password: 'wrong' });
//         });
//
//         it('response status code is 404', function() {
//             result.expect(404);
//         });
//
//         it('response body contains error message', function() {
//             result.end(function(err, res) {
//                 expect(res.body.message).to.eq('Wrong login or password.');
//             });
//         });
//     });
// });
