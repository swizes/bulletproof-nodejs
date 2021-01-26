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

  //'/:homeworkId/submissions/:submissionId',
  postHomeworkSubmissionFeedback(app, route);
  ///:homeworkId/submissions
  postHomeworkSubmission(app, route);
  ///:homeworkId/video
  updateHomeworkVideo(app, route);
  ///:homeworkId
  getHomework(app, route);
  ///:homeworkId
  updateHomework(app, route);
  ///:homeworkId
  deleteHomework(app, route);

  ///
  postHomework(app, route);
  ///
  getHomeworks(app, route);
  return app;
};
