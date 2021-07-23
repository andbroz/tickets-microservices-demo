import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password length must be between 4 to 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error('Invalid email or password');
    }

    const { email, password } = req.body;

    console.log(`Creating user ${email} - ${password}`);
    throw new Error('Error connecting to database');

    res.send({});
  },
);

export { router as signUpRouter };
