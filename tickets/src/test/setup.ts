import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // not the best way to handle it but will work for this demo
  process.env.JWT_KEY = 'testKey';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
