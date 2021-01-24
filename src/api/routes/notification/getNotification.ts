import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import NotificationService from '../../../services/notificationService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/:notificationId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling Get Notification endpoint');
    try {
      const notificationServiceInstance = Container.get(NotificationService);

      const { notification } = await notificationServiceInstance.GetNotification(req.params.notificationId.toString());

      return res.json({ notification }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
