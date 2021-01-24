import { Router } from 'express';
import refreshToken from './auth/refreshToken';
import signin from './auth/signin';
import signup from './auth/signup';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);
  refreshToken(app, route);
  signin(app, route);
  signup(app, route);
  return app;
};
