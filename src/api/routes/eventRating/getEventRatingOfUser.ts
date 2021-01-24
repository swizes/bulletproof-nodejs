import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventRatingService from '../../../services/eventRatingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/content/contentId:/users/:userId',
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling GetEventRatingOfUser endpoint');
      try {
        const eventRatingServiceInstance = Container.get(EventRatingService);

        const { eventRating } = await eventRatingServiceInstance.GetEventRatingOfUser(
          req.params.userId,
          req.params.contentId,
        );

        return res.json({ eventRating }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
