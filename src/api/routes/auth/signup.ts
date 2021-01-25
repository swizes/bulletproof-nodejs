import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import PrettyError from 'pretty-error';
import AuthService from '../../../services/auth';
import { IUserInputDTO } from '../../../interfaces/IUser';
const route = Router();

export default (app: Router, route: Router) => {
  route.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const authServiceInstance = Container.get(AuthService);
      const { user, accessToken, refreshToken } = await authServiceInstance.SignUp(req.body as IUserInputDTO);

      return res.status(201).json({ user, accessToken, refreshToken });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
