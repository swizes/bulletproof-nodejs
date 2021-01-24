import { Router } from 'express';
import getUserChat from './chat/getUserChat';
import getMessages from './chat/getMessages';
import addMessage from './chat/addMessage';
import getChats from './chat/getChats';

const route = Router();

export default (app: Router) => {
  app.use('/chats', route);
  getUserChat(app, route);
  getMessages(app, route);
  addMessage(app, route);
  getChats(app, route);

  return app;
};
