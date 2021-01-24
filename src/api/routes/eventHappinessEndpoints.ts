import { Router } from 'express';

import getEventHappiness from './eventHappiness/getEventHappiness';
import getAllEventHappiness from './eventHappiness/getAllEventHappiness';
import getUserHappinessAvg from './eventHappiness/getUserHappinessAvg';
import getTeamHappinessAvg from './eventHappiness/getTeamHappinessAvg';
import postEventHappiness from './eventHappiness/postEventHappiness';

const route = Router();

export default (app: Router) => {
  app.use('/event-happiness', route);
  getEventHappiness(app, route);
  getAllEventHappiness(app, route);
  getUserHappinessAvg(app, route);
  getTeamHappinessAvg(app, route);
  postEventHappiness(app, route);

  return app;
};
