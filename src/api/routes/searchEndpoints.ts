import { Router } from 'express';
import search from './search/search';

const route = Router();

export default (app: Router) => {
  app.use('/search', route);
  search(app, route);

  return app;
};
