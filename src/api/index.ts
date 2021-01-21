import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import team from './routes/team';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  team(app);

  return app;
};
