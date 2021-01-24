import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:homeworkId/submissions',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Post Homework submission endpoint');
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);
        const currentUserId = req.currentUser._id;
        const { homework } = await homeworkServiceInstance.PostHomeworkSubmission(
          req.params.homeworkId,
          { ...req.body },
          currentUserId,
        );

        return res.json({ homework }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
