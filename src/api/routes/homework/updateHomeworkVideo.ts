import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.patch(
    '/:homeworkId/video',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Update Homework endpoint');
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);

        const { homework } = await homeworkServiceInstance.UpdateHomeworkVideo(
          req.params.homeworkId.toString(),
          req.body.videoUrl.toString(),
        );

        return res.json({ data: homework }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
