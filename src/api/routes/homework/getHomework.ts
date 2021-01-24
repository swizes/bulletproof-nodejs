import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/:homeworkId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get Homework endpoint');
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);

        const { homework } = await homeworkServiceInstance.GetHomework(req.params.homeworkId.toString());

        return res.json({ homework }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
