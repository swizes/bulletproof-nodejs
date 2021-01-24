import { Router } from 'express';
import authEndpoints from './routes/authEndpoints';
import userEndpoints from './routes/userEndpoints';
import teamEndpoints from './routes/teamEndpoints';
import chatEndpoints from './routes/chatEndpoints';
import followEndpoints from './routes/followEndpoints';
import eventEndpoints from './routes/eventEndpoints';
import eventHappinessEndpoints from './routes/eventHappinessEndpoints';
import searchEndpoints from './routes/searchEndpoints';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  authEndpoints(app);
  userEndpoints(app);
  teamEndpoints(app);
  chatEndpoints(app);
  followEndpoints(app);
  eventEndpoints(app);
  eventHappinessEndpoints(app);
  searchEndpoints(app);

  return app;
};
