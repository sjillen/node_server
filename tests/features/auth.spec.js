const request = require('supertest');
const app = require('../../app/server');
const { User, Auth, sequelize } = require('../../models');
//const util = require('util');

describe('test the auth resource', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await Auth.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    describe('test the signup route', () => {
        test('it should signup a user', async () => {
            const userData = { email: 'user@mail.com', password: 'password' };

            const response = await request(app)
                .post('/signup')
                .send(userData);
            expect(response.status).toEqual(201);

            const auths = await Auth.findAll({ include: 'user' });
            expect(auths.length).toEqual(1);
            expect(auths[0].user.email).toEqual(userData.email);
        });

        test('it should not persist anything if wrong data is sent', async function() {
            const userData = { email: 'user@mail.com', password: {} };

            const response = await request(app)
                .post('/signup')
                .send(userData);

            expect(response.status).toEqual(400);
            const auths = await Auth.findAll({});
            expect(auths.length).toEqual(0);
            const users = await User.findAll({});
            expect(users.length).toEqual(0);
        });
    });
});
