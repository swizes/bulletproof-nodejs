import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import HomeworkService from '../../../services/homeworkService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:homeworkId/submissions/:submissionId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Post Homework Submission Feedback endpoint');
      try {
        const homeworkServiceInstance = Container.get(HomeworkService);
        const currentUserId = req.currentUser._id;
        const { homework } = await homeworkServiceInstance.PostHomeworkSubmissionFeedback(
          req.params.submissionId,
          req.body.feedback.toString(),
          req.body.rating.toString(),
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
