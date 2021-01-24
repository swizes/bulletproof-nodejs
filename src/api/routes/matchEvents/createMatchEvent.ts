import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MatchEventService from '../../../services/matchEventService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:matchId/:eventType',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Create Match Event endpoint');
      try {
        const matchEventServiceInstance = Container.get(MatchEventService);

        const { match } = await matchEventServiceInstance.CreateMatchEvent(
          req.params.matchId,
          req.body,
          req.params.eventType,
        );
        return res.json({ match }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
