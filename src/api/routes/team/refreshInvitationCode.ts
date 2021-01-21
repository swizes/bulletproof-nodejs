import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/team';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.post(
    '/:id/code/refresh',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next) => {
      logger.debug('Calling Refresh Invitation Code endpoint with params: %o', req.params);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const { invitationCode } = await teamServiceInstance.RefreshInvitationCode(req.params.id, req.currentUser._id);

        return res.json({ invitationCode }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
