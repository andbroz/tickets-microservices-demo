require('dotenv').config();
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import { signUpRouter } from './routes/sign-up';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

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
 * Middlewares
 */
app.use(errorHandler);

/** Database connection */

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB connected');
  } catch (err) {
    console.log('DB ERR:', err);
  }

  /**
   * LISTEN
   */
  app.listen(PORT, () => {
    console.log(`Auth service listening on http://localhost:${PORT}`);
  });
};

start();
