import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/userService';
import { Logger } from 'winston';
import FollowService from '../../../services/follow';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get('/:userId', middlewares.isAuth, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling Get All Followers and Followings endpoint');
    try {
      const followServiceInstance = Container.get(FollowService);

      const userId = req.params.userId;

      const { followers, following } = await followServiceInstance.GetFollowersAndFollowings(userId);

      return res
        .json({
          followers,
          following,
        })
        .status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
