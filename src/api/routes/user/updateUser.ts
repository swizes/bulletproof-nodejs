import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/userService';
import { Logger } from 'winston';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.patch(
    '/me',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.currentUser._id;
      logger.debug('Calling Update User endpoint with body: %o', userId);

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
};
