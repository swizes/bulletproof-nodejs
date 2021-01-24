import { Router } from 'express';
import getTeamEvents from './event/getTeamEvents';
import getUserEvents from './event/getUserEvents';
import getUpcomingTeamEvents from './event/getUpcomingTeamEvents';
import setAttendance from './training/setAttendance';
import updateTraining from './training/updateTraining';
import deleteTraining from './training/deleteTraining';
import createTraining from './training/createTraining';
import getTrainings from './training/getTrainings';
import getTraining from './training/getTraining';

const route = Router();

export default (app: Router) => {
  app.use('/trainings', route);
  setAttendance(app, route);
  createTraining(app, route);
  getTrainings(app, route);
  updateTraining(app, route);
  deleteTraining(app, route);
  getTraining(app, route);
  return app;
};
