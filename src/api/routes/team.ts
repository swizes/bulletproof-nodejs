import { Router } from 'express';
import createTeam from './team/createTeam';
import updateTeam from './team/updateTeam';
import getTeam from './team/getTeam';
import deleteTeam from './team/deleteTeam';

const route = Router();

export default (app: Router) => {
  app.use('/team', route);
  createTeam(app, route);
  deleteTeam(app, route);
  updateTeam(app, route);
  getTeam(app, route);
  return app;
};
