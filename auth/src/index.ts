require('dotenv').config();
import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import { signUpRouter } from './routes/sign-up';
import { errorHandler } from './middlewares/error-handler';

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

/**
 * Middlewares
 */
app.use(errorHandler);

/**
 * LISTEN
 */
app.listen(PORT, () => {
  console.log(`Auth service listening on http://localhost:${PORT}`);
});
