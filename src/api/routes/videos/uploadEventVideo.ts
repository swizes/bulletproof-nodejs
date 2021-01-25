import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import VideoService from '../../../services/videoService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.post('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next) => {
    logger.debug('Calling Upload Event Video endpoint with');

    try {
      const videoServiceInstance = Container.get(VideoService);
      const userId = req.currentUser._id;
      const { video } = await videoServiceInstance.UploadEventVideo(
        req.body.contentType,
        req.body.contentId,
        req.body.videoUrl,
        req.body.teamId,
        userId,
      );

      return res.json({ video }).status(201);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
