import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';
import notificationModel from '../models/notificationModel';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    model: require('../models/userModel').default,
  };

  const teamModel = {
    name: 'teamModel',
    model: require('../models/teamModel').default,
  };

  const followModel = {
    name: 'followModel',
    model: require('../models/followModel').default,
  };
  const eventModel = {
    name: 'eventModel',
    model: require('../models/eventModel').default,
  };

  const eventHappinessModel = {
    name: 'eventHappinessModel',
    model: require('../models/eventHappinessModel').default,
  };

  const eventRatingModel = {
    name: 'eventRatingModel',
    model: require('../models/eventRatingModel').default,
  };

  const homeworkModel = {
    name: 'homeworkModel',
    model: require('../models/homeworkModel').default,
  };

  const trainingModel = {
    name: 'trainingModel',
    model: require('../models/trainingModel').default,
  };

  const matchModel = {
    name: 'matchModel',
    model: require('../models/matchModel').default,
  };

  const chatModel = {
    name: 'chatModel',
    model: require('../models/chatModel').default,
  };
  const messageModel = {
    name: 'messageModel',
    model: require('../models/messageModel').default,
  };

  const notificationModel = {
    name: 'notificationModel',
    model: require('../models/notificationModel').default,
  };

  const deviceModel = {
    name: 'deviceModel',
    model: require('../models/deviceModel').default,
  };

  const goalModel = {
    name: 'goalModel',
    model: require('../models/goalModel').default,
  };
  const substitutionModel = {
    name: 'substitutionModel',
    model: require('../models/substitutionModel').default,
  };

  const bookingModel = {
    name: 'bookingModel',
    model: require('../models/bookingModel').default,
  };

  const otherMatchEventModel = {
    name: 'otherMatchEventModel',
    model: require('../models/otherMatchEventModel').default,
  };
  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      teamModel,
      followModel,
      eventModel,
      eventHappinessModel,
      eventRatingModel,
      homeworkModel,
      trainingModel,
      matchModel,
      messageModel,
      chatModel,
      notificationModel,
      deviceModel,
      goalModel,
      substitutionModel,
      bookingModel,
      otherMatchEventModel,

      // salaryModel,
      // whateverModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  //await jobsLoader({ agenda });
  //Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
