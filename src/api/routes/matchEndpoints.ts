import { Router } from 'express';
import getUserChat from './chat/getUserChat';
import getMessages from './chat/getMessages';
import addMessage from './chat/addMessage';
import getChats from './chat/getChats';
import updateTimer from './match/updateTimer';
import addExtraTime from './match/addExtraTime';
import finishMatch from './match/finishMatch';
import resetMatch from './match/resetMatch';
import getMatch from './match/getMatch';
import updateMatch from './match/updateMatch';
import createMatch from './match/createMatch';
import getMatches from './match/getMatches';
import deleteMatch from './match/deleteMatch';

const route = Router();

export default (app: Router) => {
  app.use('/matches', route);
  updateTimer(app, route);
  addExtraTime(app, route);
  finishMatch(app, route);
  resetMatch(app, route);
  getMatch(app, route);
  updateMatch(app, route);
  deleteMatch(app, route);
  createMatch(app, route);
  getMatches(app, route);
  return app;
};
