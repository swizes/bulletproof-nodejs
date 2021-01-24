import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventRatingService from '../../../services/eventRatingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/user', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling GetEventRatingOfUser endpoint');
    try {
      const eventRatingServiceInstance = Container.get(EventRatingService);
      const { userId, contentId } = req.query;
      const { eventRating } = await eventRatingServiceInstance.GetEventRatingOfUser(
        userId.toString(),
        contentId.toString(),
      );

      return res.json({ data: eventRating }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
