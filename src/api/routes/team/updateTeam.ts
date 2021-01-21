import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/team';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.patch('/:id', middlewares.isAuth, async (req: Request, res: Response, next) => {
    logger.debug('Calling Update Team endpoint with param: %o', req.params.id);

    try {
      const teamServiceInstance = Container.get(TeamService);
      const { team } = await teamServiceInstance.UpdateTeam(req.params.id, { ...req.body });

      return res.json({ data: team }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
