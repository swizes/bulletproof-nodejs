import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import NotificationService from '../../../services/notificationService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.delete(
    '/:notificationId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete Notification endpoint');
      try {
        const notificationServiceInstance = Container.get(NotificationService);

        const userId = req.currentUser._id;
        const { notification } = await notificationServiceInstance.DeleteNotification(req.params.notificationId);

        return res.json({ data: notification }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
