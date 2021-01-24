import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/teamService';

/**
 * Used for get by _id or invitationCode
 *
 */

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next) => {
    logger.debug('Calling Get Teams endpoint with query params: %o');
    try {
      const teamServiceInstance = Container.get(TeamService);
      const userId = req.currentUser._id;
      const { teams } = await teamServiceInstance.GetTeams(userId);

      return res.json({ teams }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
