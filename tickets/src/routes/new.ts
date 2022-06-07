import express, { Request, response, Response } from 'express';
import { requireAuth } from '@ab-learn-org/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
