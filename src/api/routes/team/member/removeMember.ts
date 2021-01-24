import { NextFunction, Request, Response, Router } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../../../middlewares';
import TeamService from '../../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.delete(
    '/:teamId/members/:userId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Update Member endpoint with params: %o', req.params);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const { team } = await teamServiceInstance.RemoveMember(req.params.teamId, req.params.userId);

        return res.json({ team }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
