import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/user';
import { Logger } from 'winston';
import FollowService from '../../../services/follow';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.put(
    '/:id',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Follow endpoint');
      try {
        const followServiceInstance = Container.get(FollowService);
        const followerId = req.currentUser._id;
        const followingId = req.params.id;
        const { followType = 'user' } = req.body;
        const { follow } = await followServiceInstance.Follow(followerId, followingId, followType);

        return res.json({ data: follow }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
