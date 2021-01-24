import { Router } from 'express';
import addUserToDeviceNotificationToken from './devices/addUserToDeviceNotificationToken';
import deleteUserFromDeviceNotificationToken from './devices/deleteUserFromDeviceNotificationToken';
import setDeviceNotificationToken from './devices/setDeviceNotificationToken';

const route = Router();

export default (app: Router) => {
  app.use('/devices', route);
  addUserToDeviceNotificationToken(app, route);
  deleteUserFromDeviceNotificationToken(app, route);
  setDeviceNotificationToken(app, route);
  return app;
};
