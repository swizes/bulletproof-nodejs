import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventHappinessService from '../../../services/eventHappinessService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/team/:teamId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling GetTeamHappinessAvg endpoint for team: %o', req.params.teamId.toString());

    try {
      const eventHappinessServiceInstance = Container.get(EventHappinessService);

      const { teamId } = req.params;
      const { physicalAvg = null, mentalAvg = null } = await eventHappinessServiceInstance.GetTeamHappinessAvg(
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
  });
};
