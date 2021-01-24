import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MatchService from '../../../services/matchService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/:matchId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling Get Match endpoint');
    try {
      const matchServiceInstance = Container.get(MatchService);

      const { match } = await matchServiceInstance.GetMatch(req.params.matchId);

      return res.json({ match }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
