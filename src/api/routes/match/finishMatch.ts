import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MatchService from '../../../services/matchService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post('/:matchId/finish', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling Finish Match endpoint');
    try {
      const matchServiceInstance = Container.get(MatchService);

      const { match } = await matchServiceInstance.FinishMatch(req.params.matchId, req.body.minute);

      return res.json({ match }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
