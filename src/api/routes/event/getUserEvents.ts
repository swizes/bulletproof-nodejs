import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventService from '../../../services/eventService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/user',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling GetUserEvents endpoint');
      try {
        const eventServiceInstance = Container.get(EventService);

        const userId = req.currentUser._id;

        const { events = [] } = await eventServiceInstance.GetUserEvents(userId);

        return res.json({ data: events }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
