import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import NotificationService from '../../../services/notificationService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/unread-amount',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get unread Notification endpoint');
      try {
        const notificationServiceInstance = Container.get(NotificationService);

        const userId = req.currentUser._id;
        const { unreadAmount } = await notificationServiceInstance.GetUnreadNotificationAmount(userId);

        return res.json({ unreadAmount }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
