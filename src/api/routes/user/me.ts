import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/user';
import { Logger } from 'winston';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.patch(
    '/me',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.currentUser._id;
      logger.debug('Calling Sign-In endpoint with body: %o', userId);

      try {
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.UpdateUser(userId, req.body);

        return res.json({ user }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.delete('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
