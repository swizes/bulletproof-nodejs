import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import EventService from '../../../services/eventService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/team/:teamId/upcoming/', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling GetUpcomingEvents endpoint');
    try {
      const eventServiceInstance = Container.get(EventService);

      const teamId = req.params.teamId;

      const { events = [] } = await eventServiceInstance.GetUpcomingTeamEvents(teamId);

      return res.json({ events }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
