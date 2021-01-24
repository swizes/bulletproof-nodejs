import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import NotificationService from '../../../services/notificationService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get Notifications endpoint');
      try {
        const notificationServiceInstance = Container.get(NotificationService);

        const userId = req.currentUser._id;
        const { notifications } = await notificationServiceInstance.GetNotifications(userId);

        return res.json({ data: notifications }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
