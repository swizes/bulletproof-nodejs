import { Router } from 'express';

import getHomeworks from './homework/getHomeworks';
import postHomeworkSubmissionFeedback from './homework/postHomeworkSubmissionFeedback';
import postHomeworkSubmission from './homework/postHomeworkSubmission';
import updateHomeworkVideo from './homework/updateHomeworkVideo';
import updateHomework from './homework/updateHomework';
import deleteHomework from './homework/deleteHomework';
import getHomework from './homework/getHomework';
import postHomework from './homework/postHomework';
import getUnreadNotificationAmount from './notification/getUnreadNotificationAmount';
import markAsRead from './notification/markAsRead';
import getNotification from './notification/getNotification';
import deleteNotification from './notification/deleteNotification';
import getNotifications from './notification/getNotifications';
import deleteNotifications from './notification/deleteNotifications';

const route = Router();

export default (app: Router) => {
  app.use('/notifications', route);
  getUnreadNotificationAmount(app, route);
  markAsRead(app, route);
  getNotification(app, route);
  deleteNotification(app, route);
  getNotifications(app, route);
  deleteNotifications(app, route);
  return app;
};
