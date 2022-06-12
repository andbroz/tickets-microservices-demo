import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';

describe('update ticket route', () => {
  it('returns a 404 if provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({ title: 'update concert', price: 20 })
      .expect(404);
  });
  it('returns a 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'update concert', price: 20 })
      .expect(401);
  });
  it('returns a 401 if user does not own the ticket', async () => {
    const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'concert', price: 20 });

    const ticketId = createTicketResponse.body.id;

    const updateResponse = await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', global.signin())
      .send({ title: 'new concert', price: 200 });

    expect(updateResponse.status).toEqual(401);
  });
  it('returns a 400 if user provides invalid title or price', async () => {
    const cookie = global.signin();
    const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'concert', price: 20 });

    const ticketId = createTicketResponse.body.id;

    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', cookie)
      .send({ title: '', price: 20 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', cookie)
      .send({ title: 'price invalid', price: -10 })
      .expect(400);
  });
  it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();
    const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({ title: 'concert', price: 20 });

    const ticketId = createTicketResponse.body.id;

    await request(app)
      .put(`/api/tickets/${ticketId}`)
      .set('Cookie', cookie)
      .send({ title: 'updated title', price: 2020 })
      .expect(200);

    const updatedTicket = await request(app).get(`/api/tickets/${ticketId}`).send();

    expect(updatedTicket.body.title).toEqual('updated title');
    expect(updatedTicket.body.price).toEqual(2020);
  });
});
