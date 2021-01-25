import { Router } from 'express';
import updateTimer from './match/updateTimer';
import addExtraTime from './match/addExtraTime';
import finishMatch from './match/finishMatch';
import resetMatch from './match/resetMatch';
import getMatch from './match/getMatch';
import updateMatch from './match/updateMatch';
import createMatch from './match/createMatch';
import getMatches from './match/getMatches';
import deleteMatch from './match/deleteMatch';
import getPlayerGoals from './match/getPlayerGoals';

const route = Router();

export default (app: Router) => {
  app.use('/matches', route);
  updateTimer(app, route);
  addExtraTime(app, route);
  finishMatch(app, route);
  resetMatch(app, route);
  getPlayerGoals(app, route);
  getMatch(app, route);
  updateMatch(app, route);
  deleteMatch(app, route);
  createMatch(app, route);
  getMatches(app, route);
  return app;
};
