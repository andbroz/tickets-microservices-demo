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

  test('should return a 400 with and invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'invalid',
        password: 'password',
      })
      .expect(400);
  });
  test('should return a 400 with and invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
  });
  test('should return a 400 with missing email and password', async () => {
    await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400);
    await request(app).post('/api/users/signup').send({ password: 'password' }).expect(400);
    await request(app).post('/api/users/signup').send({}).expect(400);
  });

  test('should disallow duplicate email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    // check duplicate email
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  test('should set a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
