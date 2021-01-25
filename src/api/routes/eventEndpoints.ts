import { Router } from 'express';
import getTeamEvents from './event/getTeamEvents';
import getUserEvents from './event/getUserEvents';
import getUpcomingTeamEvents from './event/getUpcomingTeamEvents';

const route = Router();

export default (app: Router) => {
  app.use('/events', route);
  ///team/:teamId/upcoming/
  getUpcomingTeamEvents(app, route);
  ///team/:teamId
  getTeamEvents(app, route);
  //user
  getUserEvents(app, route);
  return app;
};
