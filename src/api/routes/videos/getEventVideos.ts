import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import TeamService from '../../../services/teamService';
import VideoService from '../../../services/videoService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get(
    '/content/:contentId',
    middlewares.isAuth,

    async (req: Request, res: Response, next) => {
      logger.debug('Calling Get Event Videos endpoint with');

      try {
        const videoServiceInstance = Container.get(VideoService);

        const { videos } = await videoServiceInstance.GetEventVideos(req.params.contentId);

        return res.json({ videos }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
