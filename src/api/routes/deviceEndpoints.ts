import { Router } from 'express';
import addUserToDeviceNotificationToken from './devices/addUserToDeviceNotificationToken';
import deleteUserFromDeviceNotificationToken from './devices/deleteUserFromDeviceNotificationToken';
import setDeviceNotificationToken from './devices/setDeviceNotificationToken';

const route = Router();

export default (app: Router) => {
  app.use('/devices', route);
  //:deviceId/user/:userId
  addUserToDeviceNotificationToken(app, route);
  ///:deviceId/user/:userId
  deleteUserFromDeviceNotificationToken(app, route);
  ///:deviceId/token
  setDeviceNotificationToken(app, route);
  return app;
};
