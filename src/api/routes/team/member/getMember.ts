import { NextFunction, Request, Response, Router } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../../../middlewares';
import TeamService from '../../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/:teamId/members/:userId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get Member endpoint with params: %o', req.params);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const { data } = await teamServiceInstance.GetMember(req.params.teamId, req.params.userId);

        return res.json({ data }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
