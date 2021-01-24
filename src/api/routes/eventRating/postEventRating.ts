import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventRatingService from '../../../services/eventRatingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling PostEventRating endpoint');
      try {
        const eventRatingServiceInstance = Container.get(EventRatingService);
        const currentUserId = req.currentUser._id;
        const { eventRating } = await eventRatingServiceInstance.PostEventRating(currentUserId, { ...req.body });

        return res.json({ eventRating }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
