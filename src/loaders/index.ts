import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

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
    // Notice the require syntax and the '.default'
    model: require('../models/userModel').default,
  };

  const teamModel = {
    name: 'teamModel',
    // Notice the require syntax and the '.default'
    model: require('../models/teamModel').default,
  };

  const followModel = {
    name: 'followModel',
    // Notice the require syntax and the '.default'
    model: require('../models/followModel').default,
  };
  const eventModel = {
    name: 'eventModel',
    // Notice the require syntax and the '.default'
    model: require('../models/eventModel').default,
  };

  const eventHappinessModel = {
    name: 'eventHappinessModel',
    // Notice the require syntax and the '.default'
    model: require('../models/eventHappinessModel').default,
  };

  const eventRatingModel = {
    name: 'eventRatingModel',
    // Notice the require syntax and the '.default'
    model: require('../models/eventRatingModel').default,
  };

  const homeworkModel = {
    name: 'homeworkModel',
    // Notice the require syntax and the '.default'
    model: require('../models/homeworkModel').default,
  };

  const trainingModel = {
    name: 'trainingModel',
    // Notice the require syntax and the '.default'
    model: require('../models/trainingModel').default,
  };

  const matchModel = {
    name: 'matchModel',
    // Notice the require syntax and the '.default'
    model: require('../models/matchModel').default,
  };

  const chatModel = {
    name: 'chatModel',
    // Notice the require syntax and the '.default'
    model: require('../models/chatModel').default,
  };
  const messageModel = {
    name: 'messageModel',
    // Notice the require syntax and the '.default'
    model: require('../models/messageModel').default,
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
