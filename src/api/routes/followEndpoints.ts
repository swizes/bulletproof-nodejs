import { Router } from 'express';
import followUser from './follow/follow';
import unfollowUser from './follow/unfollow';
import getFollowersAndFollowings from './follow/getFollowersAndFollowings';
import getUserFollowStatus from './follow/getUserFollowStatus';

const route = Router();

export default (app: Router) => {
  app.use('/follows', route);
  //status/:userId
  getUserFollowStatus(app, route);
  ///:userId - put
  followUser(app, route);
  ///:userId -  delete
  unfollowUser(app, route);
  ///:userId -  get
  getFollowersAndFollowings(app, route);

  return app;
};
