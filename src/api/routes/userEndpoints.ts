import { Router } from 'express';
import me from './user/me';
import getUser from './user/getUser';
import updateUser from './user/updateUser';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);
  me(app, route);
  updateUser(app, route);
  getUser(app, route);

  return app;
};
