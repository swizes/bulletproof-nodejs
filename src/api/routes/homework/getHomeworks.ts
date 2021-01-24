import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get Homeworks endpoint');
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);

        const { homeworks } = await homeworkServiceInstance.GetHomeworks(req.query.teamId.toString());

        return res.json({ homeworks }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
