import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import ChatService from '../../../services/chatService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  route.post(
    '/:chatId/messages',
    middlewares.isAuth,
    middlewares.attachCurrentUser,

    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Add Message endpoint');
      try {
        const chatServiceInstance = Container.get(ChatService);
        const currentUserId = req.currentUser._id;
        const { message } = await chatServiceInstance.AddMessage(
          req.params.chatId.toString(),
          { ...req.body },
          currentUserId,
        );
        return res.json({ data: message }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
