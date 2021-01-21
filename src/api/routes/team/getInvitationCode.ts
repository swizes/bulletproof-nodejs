import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/team';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get('/:id/code', middlewares.isAuth, async (req: Request, res: Response, next) => {
    logger.debug('Calling Get Invitation Code endpoint with params: %o', req.params);
    try {
      const teamServiceInstance = Container.get(TeamService);
      const { invitationCode } = await teamServiceInstance.GetInvitationCode(req.params.id);

      return res.json({ invitationCode }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
