import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import NotificationService from '../../../services/notificationService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/notificationId:/mark-as-read',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Mark as Read Notification endpoint');
      try {
        const notificationServiceInstance = Container.get(NotificationService);

        const { notification } = await notificationServiceInstance.MarkAsRead(req.params.notificationId);

        return res.json({ notification }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
