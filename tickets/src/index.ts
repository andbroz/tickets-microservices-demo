import mongoose from 'mongoose';
import { app } from './app';

/** Database connection */

const PORT = process.env.PORT ?? 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY environment variable found');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('No MONGO_URI environment variable found');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info('DB connected:', process.env.MONGO_URI);
  } catch (err) {
    if (err instanceof Error) {
      console.error('DB ERR:', err.message);
    }
    console.error('DB ERR:', JSON.stringify(err, null, 2));
  }

  /**
   * LISTEN
   */
  app.listen(PORT, () => {
    console.info(`Tickets service listening on http://localhost:${PORT}`);
  });
};

start();
