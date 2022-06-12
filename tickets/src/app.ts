require('dotenv').config();
import { errorHandler, NotFoundError, currentUser } from '@ab-learn-org/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { indexTicketRouter } from './routes/index';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';

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

app.use(currentUser);

/**
 * ROUTES
 */

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// Not found route error handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

/**
 * Middleware
 */

app.use(errorHandler);

export { app };
