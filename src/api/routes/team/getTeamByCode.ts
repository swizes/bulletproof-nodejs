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
  route.get('/code/:invitationCode', middlewares.isAuth, async (req: Request, res: Response, next) => {
    logger.debug('Calling Get Team By Code endpoint with query params: %o', req.params.invitationCode);
    try {
      const teamServiceInstance = Container.get(TeamService);
      const { team } = await teamServiceInstance.GetTeamByCode(req.params.invitationCode);

      return res.json({ team }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
