import request from 'supertest';
import { app } from '../app';

describe('tickets routes', () => {
  it('has route handler listening to /api/tickets for POST requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
  });
  it('can only be accessed if user is signed in', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).toEqual(401);
  });
  it('return status other than 401 if user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });
  it('return error if invalid title is provided', async () => {});
  it('should create a ticket with valid inputs', async () => {});
});
