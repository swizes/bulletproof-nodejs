import { Router } from 'express';
import getUserChat from './chat/getUserChat';
import getMessages from './chat/getMessages';
import addMessage from './chat/addMessage';
import getChats from './chat/getChats';

const route = Router();

export default (app: Router) => {
  app.use('/chats', route);
  ///user/:recipientId
  getUserChat(app, route);
  //:chatId/messages
  getMessages(app, route);
  //:chatId/messages
  addMessage(app, route);
  //
  getChats(app, route);

  return app;
};
