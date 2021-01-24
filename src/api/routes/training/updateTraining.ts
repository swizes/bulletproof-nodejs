import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import TrainingService from '../../../services/trainingService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.patch(
    '/:trainingId',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Update Training endpoint');
      try {
        const trainingServiceInstance = Container.get(TrainingService);

        const { training } = await trainingServiceInstance.UpdateTraining({ ...req.body }, req.params.trainingId);

        return res.json({ data: training }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
