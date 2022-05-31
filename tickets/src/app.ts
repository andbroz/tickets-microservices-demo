require('dotenv').config();
import { errorHandler, NotFoundError } from '@ab-learn-org/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';

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

// Not found route error handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

/**
 * Middleware
 */

app.use(errorHandler);

export { app };
