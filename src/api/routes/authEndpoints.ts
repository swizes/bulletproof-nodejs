import { Router } from 'express';
import refreshToken from './auth/refreshToken';
import signin from './auth/signin';
import signup from './auth/signup';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);
  //refresh-token
  refreshToken(app, route);
  //signin
  signin(app, route);
  //signup
  signup(app, route);
  return app;
};
