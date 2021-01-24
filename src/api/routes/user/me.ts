import { NextFunction, Request, Response, Router } from 'express';
import middlewares from '../../middlewares';
import { Container } from 'typedi';
import UserService from '../../../services/userService';
import { Logger } from 'winston';

export default (app: Router, route: Router) => {
  const logger: Logger = Container.get('logger');
  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.delete('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
