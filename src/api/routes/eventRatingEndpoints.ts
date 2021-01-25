import { Router } from 'express';
import getEventRatingOfUser from './eventRating/getEventRatingOfUser';
import getUserRatings from './eventRating/getUserRatings';
import postEventRating from './eventRating/postEventRating';
import getEventRatings from './eventRating/getEventRatings';

const route = Router();

export default (app: Router) => {
  app.use('/event-ratings', route);
  //team/:teamId/user/:userId
  getUserRatings(app, route);
  ///content/:contentId/users/:userId
  getEventRatingOfUser(app, route);
  //content/:contentId
  getEventRatings(app, route);
  //
  postEventRating(app, route);

  return app;
};
