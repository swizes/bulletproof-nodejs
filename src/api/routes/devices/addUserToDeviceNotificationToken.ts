import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import DeviceService from '../../../services/deviceService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post('/:deviceId/user/:userId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling AddUserToDeviceNotificationToken endpoint');
    try {
      const deviceServiceInstance = Container.get(DeviceService);

      const { device } = await deviceServiceInstance.AddUserToDeviceNotificationToken(
        req.params.deviceId,
        req.params.userId,
      );

      return res.json({ data: device }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
