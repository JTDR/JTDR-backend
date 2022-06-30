const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const sessionToken = await UserService.signIn(req.body);
      console.log(sessionToken);
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          // secure: process.env.SECURE_COOKIES === 'true',
          // sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Successfully signed in' });
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });
