import { Router } from 'express';

import getHomeworks from './homework/getHomeworks';
import postHomeworkSubmissionFeedback from './homework/postHomeworkSubmissionFeedback';
import postHomeworkSubmission from './homework/postHomeworkSubmission';
import updateHomeworkVideo from './homework/updateHomeworkVideo';
import updateHomework from './homework/updateHomework';
import deleteHomework from './homework/deleteHomework';
import getHomework from './homework/getHomework';
import postHomework from './homework/postHomework';

const route = Router();

export default (app: Router) => {
  app.use('/homeworks', route);
  getHomeworks(app, route);
  postHomeworkSubmissionFeedback(app, route);
  postHomeworkSubmission(app, route);
  updateHomeworkVideo(app, route);
  updateHomework(app, route);
  deleteHomework(app, route);
  getHomework(app, route);
  postHomework(app, route);
  return app;
};
