import { IUser } from '../interfaces/IUser';
import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IGoal } from '../interfaces/IGoal';
import { IBooking } from '../interfaces/IBooking';
import { IOtherMatchEvent } from '../interfaces/IOtherMatchEvent';

const OtherMatchEventSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      default: 'other',
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

OtherMatchEventSchema.methods = {};

export default mongoose.model<IOtherMatchEvent & mongoose.Document>('OtherMatchEvent', OtherMatchEventSchema);
