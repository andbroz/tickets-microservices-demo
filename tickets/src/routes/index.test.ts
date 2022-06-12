import request from 'supertest';
import { app } from '../app';

const createTicket = (title: string, price: number) => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title, price });
};

describe('get all tickets route', () => {
  it('should return a list of tickets', async () => {
    await createTicket('concert', 20);
    await createTicket('concert2', 22);
    await createTicket('concert3', 23);

    const response = await request(app).get('/api/tickets').send();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
  });
});
