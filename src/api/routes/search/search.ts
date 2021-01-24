import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import { Logger } from 'winston';
import SearchService from '../../../services/searchService';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Search endpoint with');
      const userId = req.currentUser._id;
      const { searchKey = '', searchValue = '' } = req.query;

      try {
        const searchServiceInstance = Container.get(SearchService);
        const { result } = await searchServiceInstance.Search(searchKey.toString(), searchValue.toString(), userId);

        return res.json({ data: result }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
