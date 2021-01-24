import { IUser } from '../interfaces/IUser';
import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const FollowModel = new mongoose.Schema(
  {
    followerId: { type: Schema.Types.ObjectId },
    followingId: { type: Schema.Types.ObjectId },
    followType: {
      type: String,
      enums: [
        'user', //user
        'team', //team
      ],
      default: 0,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

FollowModel.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Follow', FollowModel);
