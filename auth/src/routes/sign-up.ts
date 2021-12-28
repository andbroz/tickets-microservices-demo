import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

const router = express.Router();

// we check it at the beginning of app start up @ index
const jwtKey = process.env.JWT_KEY!;

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password length must be between 4 to 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate jwt

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtKey,
    );
    // store token in session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  },
);

export { router as signUpRouter };
