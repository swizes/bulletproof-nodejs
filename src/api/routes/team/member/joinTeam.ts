import { NextFunction, Request, Response, Router } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../../../middlewares';
import TeamService from '../../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:teamId/members/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Join Team endpoint with params: %o', req.params);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const userId = req.currentUser._id;
        const { team } = await teamServiceInstance.JoinTeam(req.params.teamId, { userId, ...req.body });

        return res.json({ team }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
