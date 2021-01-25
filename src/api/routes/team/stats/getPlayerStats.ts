import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';

import StatsService from '../../../../services/statsService';
import middlewares from '../../../middlewares';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get(
    '/:teamId/stats/user/:userId',
    middlewares.isAuth,

    async (req: Request, res: Response, next) => {
      logger.debug('Calling GetPlayerStats endpoint with');

      try {
        const statsServiceInstance = Container.get(StatsService);
        const { minuteStats, goalStats, assistStats } = await statsServiceInstance.GetPlayerStats(
          req.params.teamId,
          req.params.userId,
        );

        return res.json({ minuteStats, goalStats, assistStats }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
