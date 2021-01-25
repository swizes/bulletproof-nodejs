import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import FollowService from '../../../services/follow';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.delete(
    '/:userId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Follow endpoint');
      try {
        const followServiceInstance = Container.get(FollowService);
        const followerId = req.currentUser._id;
        const followingId = req.params.userId;
        const { followType = 'user' } = req.body;
        const { success } = await followServiceInstance.Unfollow(followerId, followingId);

        return res.json({ success }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
