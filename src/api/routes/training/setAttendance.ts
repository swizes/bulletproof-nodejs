import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import TrainingService from '../../../services/trainingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:trainingId/attendance',
    middlewares.isAuth,
    middlewares.attachCurrentUser,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Set Training Attendance endpoint');
      try {
        const trainingServiceInstance = Container.get(TrainingService);
        const currentUserId = req.currentUser._id;
        const { training } = await trainingServiceInstance.SetAttendance(
          req.params.trainingId,
          currentUserId,
          req.body.status,
        );

        return res.json({ training }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
