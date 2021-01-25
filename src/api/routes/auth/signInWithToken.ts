import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import AuthService from '../../../services/auth';
import config from '../../../config';
import jwt from 'jsonwebtoken';

export default (app: Router, route: Router) => {
  route.post('/signin-token', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const { oldRefreshToken } = req.body;

      jwt.verify(oldRefreshToken, config.jwtRefreshSecret);
      const authServiceInstance = Container.get(AuthService);
      const { user, accessToken, refreshToken } = await authServiceInstance.GenerateNewToken(oldRefreshToken);
      return res.json({ user, accessToken, refreshToken }).status(200);
    } catch (error) {
      logger.error('🔥 error: %o', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ error: 'Session timed out,please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'Invalid token,please login again!' });
      } else {
        //catch other unprecedented errors
        return res.status(400).json({ error });
      }
    }
  });
};
