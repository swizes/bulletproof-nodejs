import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ITeam } from '../../interfaces/ITeam';
import { IFollow } from '../../interfaces/IFollow';
import { IEvent } from '../../interfaces/IEvent';
import { IEventHappiness } from '../../interfaces/IEventHappiness';
import { IEventRating } from '../../interfaces/IEventRating';
import { IHomework } from '../../interfaces/IHomework';
import { ITraining } from '../../interfaces/ITraining';
import { IMatch } from '../../interfaces/IMatch';
import { IMessage } from '../../interfaces/IMessage';
import { IChat } from '../../interfaces/IChat';
import { INotification } from '../../interfaces/INotification';
import { IDevice } from '../../interfaces/IDevice';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TeamModel = Model<ITeam & Document>;
    export type FollowModel = Model<IFollow & Document>;
    export type EventModel = Model<IEvent & Document>;
    export type EventHappinessModel = Model<IEventHappiness & Document>;
    export type EventRatingModel = Model<IEventRating & Document>;
    export type HomeworkModel = Model<IHomework & Document>;
    export type TrainingModel = Model<ITraining & Document>;
    export type MatchModel = Model<IMatch & Document>;
    export type ChatModel = Model<IChat & Document>;
    export type MessageModel = Model<IMessage & Document>;
    export type NotificationModel = Model<INotification & Document>;
    export type DeviceModel = Model<IDevice & Document>;
  }
}
