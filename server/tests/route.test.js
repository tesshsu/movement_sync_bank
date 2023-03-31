const request = require('supertest');
const app = require('../src/server');
const models = require('../db/default-data.json');

const correctData = models.correctData;
const soldNotSyncData = models.soldNotSyncData;
const doubleRepeatData = models.doubleRepeatData;

describe('POST /movements/validation', () => {
    it('should return a 202 status code and a success message if the data is valid', async () => {
        const response = await request(app)
            .post('/movements/validation')
            .send(correctData);
        expect(response.status).toBe(202);
        expect(response.body.message).toBe('Accepted');
    });

    it('should return a 418 status code and an error message if the sold is not sync up', async () => {
        const response = await request(app)
            .post('/movements/validation')
            .send(soldNotSyncData);

        expect(response.status).toBe(418);
        expect(response.body.message).toBe('I’m a teapot');
        expect(response.body.reasons).toBeInstanceOf(Array);
    });

    it('should return a 418 status code and an error message if the movements are double repeat', async () => {
        const response = await request(app)
            .post('/movements/validation')
            .send(doubleRepeatData);

        expect(response.status).toBe(418);
        expect(response.body.message).toBe('I’m a teapot');
        expect(response.body.reasons).toBeInstanceOf(Array);
    });
});
