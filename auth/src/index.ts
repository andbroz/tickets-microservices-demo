import mongoose from 'mongoose';
import { app } from './app';

/** Database connection */

const PORT = process.env.PORT ?? 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY environment variable found');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.info('DB connected');
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
    console.info(`Auth service listening on http://localhost:${PORT}`);
  });
};

start();
