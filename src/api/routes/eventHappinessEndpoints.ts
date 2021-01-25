import { Router } from 'express';

import getEventHappiness from './eventHappiness/getEventHappiness';
import getAllEventHappiness from './eventHappiness/getAllEventHappiness';
import getUserHappinessAvg from './eventHappiness/getUserHappinessAvg';
import getTeamHappinessAvg from './eventHappiness/getTeamHappinessAvg';
import postEventHappiness from './eventHappiness/setEventHappiness';

const route = Router();

export default (app: Router) => {
  app.use('/event-happiness', route);
  ///team/:teamId/user/:userId
  getUserHappinessAvg(app, route);
  ///team/:teamId
  getTeamHappinessAvg(app, route);
  ///content/:contentId/user
  getEventHappiness(app, route);
  ///content/:contentId'
  getAllEventHappiness(app, route);
  ///content/:contentId
  postEventHappiness(app, route);

  return app;
};
