import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventHappinessService from '../../../services/eventHappinessService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/all',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling GetAllEventHappiness endpoint for content: %o', req.query.contentId.toString());

      try {
        const eventHappinessServiceInstance = Container.get(EventHappinessService);

        const { contentId } = req.query;
        const { eventHappiness } = await eventHappinessServiceInstance.GetAllEventHappiness(contentId.toString());

        return res.json({ data: eventHappiness }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
