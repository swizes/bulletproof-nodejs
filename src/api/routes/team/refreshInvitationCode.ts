import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.post(
    '/:teamId/code',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next) => {
      logger.debug('Calling Refresh Invitation Code endpoint with params: %o', req.params.teamId);
      try {
        const teamServiceInstance = Container.get(TeamService);
        const { invitationCode } = await teamServiceInstance.RefreshInvitationCode(
          req.params.teamId,
          req.currentUser._id,
        );

        return res.json({ invitationCode }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
