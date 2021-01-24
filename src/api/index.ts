import { Router } from 'express';
import authEndpoints from './routes/authEndpoints';
import userEndpoints from './routes/userEndpoints';
import teamEndpoints from './routes/teamEndpoints';
import chatEndpoints from './routes/chatEndpoints';
import followEndpoints from './routes/followEndpoints';
import eventEndpoints from './routes/eventEndpoints';
import eventHappinessEndpoints from './routes/eventHappinessEndpoints';
import searchEndpoints from './routes/searchEndpoints';
import homeworkEndpoints from './routes/homeworkEndpoints';
import notificationEndpoints from './routes/notificationEndpoints';
import trainingEndpoints from './routes/trainingEndpoints';
import deviceEndpoints from './routes/deviceEndpoints';
import eventRatingEndpoints from './routes/eventRatingEndpoints';
import matchEndpoints from './routes/matchEndpoints';
import matchEventEndpoints from './routes/matchEventEndpoints';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  authEndpoints(app);
  chatEndpoints(app);
  deviceEndpoints(app);
  eventEndpoints(app);
  eventHappinessEndpoints(app);
  eventRatingEndpoints(app);
  followEndpoints(app);
  homeworkEndpoints(app);
  matchEndpoints(app);
  matchEventEndpoints(app);
  notificationEndpoints(app);
  searchEndpoints(app);
  teamEndpoints(app);
  trainingEndpoints(app);
  userEndpoints(app);

  return app;
};
