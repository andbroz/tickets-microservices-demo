import express from 'express';
import { currentUser } from '../middlewares/currentUser';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
