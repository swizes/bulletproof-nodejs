import { Router } from 'express';
import followUser from './follow/follow';
import unfollowUser from './follow/unfollow';

const route = Router();

export default (app: Router) => {
  app.use('/follow', route);
  followUser(app, route);
  unfollowUser(app, route);
  return app;
};
