import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/team';

/**
 * Used for get by _id or invitationCode
 *
 */

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get('/', middlewares.isAuth, async (req: Request, res: Response, next) => {
    logger.debug('Calling Get Team endpoint with query params: %o', req.query);
    try {
      const teamServiceInstance = Container.get(TeamService);
      const { team } = await teamServiceInstance.GetTeam(req.query);

      return res.json({ team }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
