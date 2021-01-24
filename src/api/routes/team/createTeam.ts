import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/teamService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.post('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next) => {
    const userId = req.currentUser._id;

    logger.debug('Calling Create Team endpoint with');

    try {
      const teamServiceInstance = Container.get(TeamService);
      const { team } = await teamServiceInstance.CreateTeam({ ...req.body }, userId);

      return res.json({ team }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
