import request from 'supertest';
import { app } from '../../app';

describe('Signup', () => {
  test('should return 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });
});
