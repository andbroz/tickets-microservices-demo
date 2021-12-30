require('dotenv').config();
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import { signUpRouter } from './routes/sign-up';

const app = express();

// https://expressjs.com/en/5x/api.html#trust.proxy.options.table
// express is behind ingress-nginx and need to trust that proxy
app.set('trust proxy', true);
app.set('x-powered-by', false);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
