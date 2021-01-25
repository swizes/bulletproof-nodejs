import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MatchService from '../../../services/matchService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/:matchId/goals/:userId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling GetPlayerGoals endpoint');
    try {
      const matchServiceInstance = Container.get(MatchService);

      const { goals } = await matchServiceInstance.GetPlayerMatchGoals(req.params.matchId, req.params.userId);

      return res.json({ goals }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
