import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventHappinessService from '../../../services/eventHappinessService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/team/:teamId/user/:userId',
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling GetUserHappinessAvg endpoint for user: %o', req.params.userId.toString());

      try {
        const eventHappinessServiceInstance = Container.get(EventHappinessService);

        const { teamId, userId } = req.params;
        const { physicalAvg = null, mentalAvg = null } = await eventHappinessServiceInstance.GetUserHappinessAvg(
          userId.toString(),
          teamId.toString(),
        );
        return res
          .json({
            mentalAvg,
            physicalAvg,
          })
          .status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
