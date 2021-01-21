import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import AuthService from '../../../services/auth';
import middlewares from '../../middlewares';

export default (app: Router, route: Router) => {
  route.post(
    '/refresh-token',
    celebrate({
      body: Joi.object({
        oldRefreshToken: Joi.string().required(),
      }),
    }),
    middlewares.isRefreshAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');

      logger.debug('Calling Refresh-Token endpoint');

      try {
        const { oldRefreshToken } = req.body;

        const authServiceInstance = Container.get(AuthService);

        const { user, accessToken, refreshToken } = await authServiceInstance.GenerateNewToken(oldRefreshToken);

        return res.json({ user, accessToken, refreshToken }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);

        return next(e);
      }
    },
  );
};
