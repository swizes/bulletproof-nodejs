import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import FollowService from '../../../services/follow';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/status/:userId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Follow endpoint');
      try {
        const followServiceInstance = Container.get(FollowService);
        const followerId = req.currentUser._id;
        const followingId = req.params.userId;
        const { followType = 'user' } = req.body;
        const { followingData, followData } = await followServiceInstance.GetUserFollowStatus(followerId, followingId);

        return res.json({ followingData, followData }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
