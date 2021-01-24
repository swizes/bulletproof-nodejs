import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.delete(
    '/:teamId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next) => {
      logger.debug('Calling Delete Team endpoint with param: %o', req.params.teamId);

      try {
        const teamServiceInstance = Container.get(TeamService);
        const { success } = await teamServiceInstance.DeleteTeam(req.params.teamId, req.currentUser._id);

        return res.json({ success }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
