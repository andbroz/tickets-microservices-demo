import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';

describe('get ticket details route', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it('should return a ticket if it exists', async () => {
    const ticket = {
      title: 'concert',
      price: 20,
    };

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(ticket)
      .expect(201);

    const ticketId = response.body.id;
    const ticketResponse = await request(app).get(`/api/tickets/${ticketId}`).send().expect(200);

    expect(ticketResponse.body.title).toEqual(ticket.title);
    expect(ticketResponse.body.price).toEqual(ticket.price);
  });
});
