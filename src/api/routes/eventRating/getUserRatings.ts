import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventRatingService from '../../../services/eventRatingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/user', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling GetUserRatings endpoint');
    try {
      const eventRatingServiceInstance = Container.get(EventRatingService);
      const { userId, teamId } = req.query;
      const { eventRatings } = await eventRatingServiceInstance.GetUserRatings(userId.toString(), teamId.toString());

      return res.json({ data: eventRatings }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
