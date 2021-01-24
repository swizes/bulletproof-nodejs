import { Router } from 'express';
import getTeamEvents from './event/getTeamEvents';
import getUserEvents from './event/getUserEvents';
import getUpcomingTeamEvents from './event/getUpcomingTeamEvents';

const route = Router();

export default (app: Router) => {
  app.use('/events', route);
  getTeamEvents(app, route);
  getUserEvents(app, route);
  getUpcomingTeamEvents(app, route);
  return app;
};
