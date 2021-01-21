import { Router } from 'express';
import me from './user/me';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);
  me(app, route);

  return app;
};
