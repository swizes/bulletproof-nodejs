import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import ChatService from '../../../services/chatService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/:chatId/messages',
    middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get Messages endpoint');
      try {
        const chatServiceInstance = Container.get(ChatService);
        const { messages } = await chatServiceInstance.GetMessages(req.params.chatId);
        return res.json({ data: messages }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
