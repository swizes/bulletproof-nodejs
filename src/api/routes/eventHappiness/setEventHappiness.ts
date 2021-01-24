import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventHappinessService from '../../../services/eventHappinessService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/content/:contentId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling SetEventHappiness endpoint for content: %o', req.params.contentId.toString());

      try {
        const eventHappinessServiceInstance = Container.get(EventHappinessService);

        const userId = req.currentUser._id;
        const { contentId, teamId, contentType, mental, physical } = req.body;
        const { eventHappiness } = await eventHappinessServiceInstance.PostEventHappiness({
          userId,
          contentId,
          teamId,
          contentType,
          mental,
          physical,
        });
        return res.json({ eventHappiness }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
