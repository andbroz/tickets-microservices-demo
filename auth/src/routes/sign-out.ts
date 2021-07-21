import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('goodbye');
});

export { router as signOutRouter };
