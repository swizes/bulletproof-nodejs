import { NextFunction, Request, Response, Router } from 'express';

import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../../../middlewares';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');

  //ToDo: Finish this
  route.get(
    '/:id/member/remove/:removeId',
    middlewares.isAuth,

    (req: Request, res: Response, next: NextFunction) => {
      return res.json({ id: req.params.id, removeId: req.params.removeId, end: 'remove' }).status(200);
    },
  );
};
