import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ITeam } from '../../interfaces/ITeam';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TeamModel = Model<ITeam & Document>;
  }
}
