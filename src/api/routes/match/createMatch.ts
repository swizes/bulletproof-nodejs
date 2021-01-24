import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MatchService from '../../../services/matchService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Create Match endpoint');
      try {
        const matchServiceInstance = Container.get(MatchService);
        const currentUserId = req.currentUser._id;
        const { match } = await matchServiceInstance.CreateMatch({ ...req.body }, currentUserId);

        return res.json({ match }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
