import { Router } from 'express';
import createMatchEvent from './matchEvents/createMatchEvent';

const route = Router();

export default (app: Router) => {
  app.use('/match-events', route);
  createMatchEvent(app, route);

  return app;
};
