import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';

import AppDataSource from 'database/AppDataSource';
import User from 'database/entities/User';

import { app } from '../../../';

describe('Transactions List', () => {
  const userRepository = AppDataSource.getRepository(User);

  let userToken = '';
  const userPassword = 'pass1';

  const user = new User();

  user.username = 'Andres';
  user.name = 'Andres Dos';
  user.email = 'andres.dos@test.com';
  user.password = userPassword;
  user.hashPassword();

  before(async () => {
    await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await userRepository.save(user);
    const res = await request(app).post('/v1/auth/login').send({ email: user.email, password: userPassword });
    userToken = res.body.data;
  });
  describe('GET /v1/restaurants', () => {
    it('should get all transactions', async () => {
      const res = await request(app).get('/v1/users').set('Authorization', userToken);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('List of transactions.');
    });

    it('should report error of unauthorized user', async () => {
      const res = await request(app).get('/v1/restaurants').set('Authorization', '');
      expect(res.status).to.equal(401);
      expect(res.body.errorType).to.equal('Unauthorized');
      expect(res.body.errorRaw).to.an('null');
      expect(res.body.errorsValidation).to.an('null');
    });
  });
  after(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });
});
