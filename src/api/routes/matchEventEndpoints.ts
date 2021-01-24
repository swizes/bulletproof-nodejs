import { Router } from 'express';
import getUserChat from './chat/getUserChat';
import getMessages from './chat/getMessages';
import addMessage from './chat/addMessage';
import getChats from './chat/getChats';
import createMatchEvent from './matchEvents/createMatchEvent';

const route = Router();

export default (app: Router) => {
  app.use('/match-events', route);
  createMatchEvent(app, route);

  return app;
};
