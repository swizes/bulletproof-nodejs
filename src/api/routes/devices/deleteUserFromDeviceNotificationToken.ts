import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import DeviceService from '../../../services/deviceService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.delete(
    '/:deviceId/user/:userId',
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling DeleteUserFromDeviceNotificationToken endpoint');
      try {
        const deviceServiceInstance = Container.get(DeviceService);

        const { device } = await deviceServiceInstance.DeleteUserFromDeviceNotificationToken(
          req.params.deviceId,
          req.params.userId,
        );

        return res.json({ device }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
