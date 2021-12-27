require('dotenv').config();
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import { signUpRouter } from './routes/sign-up';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = process.env.PORT ?? 3000;
const app = express();

// https://expressjs.com/en/5x/api.html#trust.proxy.options.table
// express is behind ingress-nginx and need to trust that proxy
app.set('trust proxy', true);
app.set('x-powered-by', false);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

/**
 * ROUTES
 */

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// Not found route error handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

/**
 * Middleware
 */

app.use(errorHandler);

/** Database connection */

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
