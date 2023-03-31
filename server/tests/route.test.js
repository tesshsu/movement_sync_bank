const request = require('supertest');
const app = require('../src/server');

describe('POST /movements/validation', () => {
    it('should return a 202 status code and a success message if the data is valid', async () => {
        const data = {
            movements: [
                {
                    "id": "1",
                    "label": "Payment 1",
                    "amount": -500,
                    "date": "2022-01-01"
                },
                {
                    "id": "2",
                    "label": "Payment 2",
                    "amount": -300,
                    "date": "2022-01-02"
                },
                {
                    "id": "3",
                    "label": "Deposit",
                    "amount": 800,
                    "date": "2022-01-03"
                },
                {
                    "id": "4",
                    "label": "Deposit",
                    "amount": 800,
                    "date": "2022-01-04"
                }
            ],
            balances: [
                {
                    "date": "2022-01-01",
                    "balance": -500
                },
                {
                    "date": "2022-01-02",
                    "balance": -800
                },
                {
                    "date": "2022-01-03",
                    "balance": 0
                },
                {
                    "date": "2022-01-04",
                    "balance": 800
                }
            ]
        };

        const response = await request(app)
            .post('/movements/validation')
            .send(data);
        console.log('response', response);
        expect(response.status).toBe(202);
        expect(response.body.message).toBe('Accepted');
    });

    it('should return a 418 status code and an error message if the sold is not sync up', async () => {
        const data = {
            movements: [
                {
                    "id": "1",
                    "label": "Payment 1",
                    "amount": -500,
                    "date": "2022-01-01"
                },
                {
                    "id": "2",
                    "label": "Payment 2",
                    "amount": -300,
                    "date": "2022-01-02"
                },
                {
                    "id": "3",
                    "label": "Deposit",
                    "amount": 800,
                    "date": "2022-01-03"
                }
            ],
            balances: [
                {
                    "date": "2022-01-01",
                    "balance": 1000
                },
                {
                    "date": "2022-01-02",
                    "balance": 700
                },
                {
                    "date": "2022-01-03",
                    "balance": 1500
                }
            ]
        };

        const response = await request(app)
            .post('/movements/validation')
            .send(data);

        expect(response.status).toBe(418);
        expect(response.body.message).toBe('I’m a teapot');
        expect(response.body.reasons).toBeInstanceOf(Array);
    });

    it('should return a 418 status code and an error message if the movements are double repeat', async () => {
        const data = {
            movements: [
                {
                    "id": "1",
                    "label": "Payment 1",
                    "amount": -500,
                    "date": "2022-01-01"
                },
                {
                    "id": "2",
                    "label": "Payment 1",
                    "amount": -500,
                    "date": "2022-01-01"
                },
                {
                    "id": "3",
                    "label": "Deposit",
                    "amount": 800,
                    "date": "2022-01-03"
                },
                {
                    "id": "4",
                    "label": "Deposit",
                    "amount": 800,
                    "date": "2022-01-04"
                }
            ],
            balances: [
                {
                    "date": "2022-01-01",
                    "balance": -500
                },
                {
                    "date": "2022-01-02",
                    "balance": -800
                },
                {
                    "date": "2022-01-03",
                    "balance": 0
                },
                {
                    "date": "2022-01-04",
                    "balance": 800
                }
            ]
        };

        const response = await request(app)
            .post('/movements/validation')
            .send(data);

        expect(response.status).toBe(418);
        expect(response.body.message).toBe('I’m a teapot');
        expect(response.body.reasons).toBeInstanceOf(Array);
    });
});
