import { NextFunction, Request, Response, Router } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../../../middlewares';
import TeamService from '../../../../services/team';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.patch(
    '/:id/member/:uid',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Update Member endpoint with params: %o', req.params);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const { data } = await teamServiceInstance.UpdateMember(req.params.id, req.params.uid, req.body);

        return res.json({ data }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
