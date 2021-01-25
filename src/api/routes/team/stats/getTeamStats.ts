import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';

import StatsService from '../../../../services/statsService';
import middlewares from '../../../middlewares';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get(
    '/:teamId/stats/',
    middlewares.isAuth,

    async (req: Request, res: Response, next) => {
      logger.debug('Calling GetTeamStats endpoint with');

      try {
        const statsServiceInstance = Container.get(StatsService);
        const { teamGoalStats, playerMinuteStats } = await statsServiceInstance.GetTeamStats(req.params.teamId);

        return res.json({ teamGoalStats, playerMinuteStats }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
