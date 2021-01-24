import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/userService';
import { Logger } from 'winston';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get(
    '/:userId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get User endpoint with body: %o', req.params.userId);

      try {
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.GetUser(req.params.userId);

        return res.json({ data: user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
