import { Router } from 'express';
import getEventVideos from './videos/getEventVideos';
import getTeamVideos from './videos/getTeamVideos';
import uploadEventVideo from './videos/uploadEventVideo';

const route = Router();

export default (app: Router) => {
  app.use('/videos', route);
  getEventVideos(app, route);
  getTeamVideos(app, route);
  uploadEventVideo(app, route);

  return app;
};
