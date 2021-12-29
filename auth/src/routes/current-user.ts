import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  // check if user have a jwt set
  if (!req.session?.jwt) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ currentUser: null });
  }
});

export { router as currentUserRouter };
