import { Router } from 'express';
import getUnreadNotificationAmount from './notification/getUnreadNotificationAmount';
import markAsRead from './notification/markAsRead';
import getNotification from './notification/getNotification';
import deleteNotification from './notification/deleteNotification';
import getNotifications from './notification/getNotifications';
import deleteNotifications from './notification/deleteNotifications';

const route = Router();

export default (app: Router) => {
  app.use('/notifications', route);
  ///unread-amount
  getUnreadNotificationAmount(app, route);
  ///:notificationId/mark-as-read
  markAsRead(app, route);
  //:notificationId
  getNotification(app, route);
  deleteNotification(app, route);
  deleteNotifications(app, route);
  getNotifications(app, route);
  return app;
};
