import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import DeviceService from '../../../services/deviceService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling SetDeviceNotificationToken endpoint');
    try {
      const deviceServiceInstance = Container.get(DeviceService);

      const { device } = await deviceServiceInstance.SetDeviceNotificationToken(req.body.deviceId, req.body.token);

      return res.json({ device }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
