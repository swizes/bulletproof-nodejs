import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.delete(
    '/:homeworkId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete Homework endpoint', req.params.homeworkId);
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);

        await homeworkServiceInstance.DeleteHomework(req.params.homeworkId);

        return res.json({ success: true }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
