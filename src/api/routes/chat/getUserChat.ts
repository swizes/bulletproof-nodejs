import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import ChatService from '../../../services/chatService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.get(
    '/user-chat/:recipientId',
    middlewares.isAuth,
    middlewares.attachCurrentUser,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Get User Chat endpoint');
      try {
        const chatServiceInstance = Container.get(ChatService);
        const currentUserId = req.currentUser._id;
        const { chat } = await chatServiceInstance.GetUserChat(currentUserId, req.params.recipientId);
        return res.json({ data: chat }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
