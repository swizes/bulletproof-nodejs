import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import AuthService from '../../../services/auth';

const route = Router();

export default (app: Router, route: Router) => {
  route.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const { email, password } = req.body;
      const authServiceInstance = Container.get(AuthService);
      const { user, accessToken, refreshToken } = await authServiceInstance.SignIn(email, password);
      return res.json({ user, accessToken, refreshToken }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
