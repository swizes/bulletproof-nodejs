import { IUser } from '../interfaces/IUser';
import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IGoal } from '../interfaces/IGoal';

const GoalSchema = new mongoose.Schema(
  {
    scorer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    assist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    side: {
      type: String,
      enums: ['home', 'away'],
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      default: 'goal',
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

GoalSchema.methods = {};

export default mongoose.model<IGoal & mongoose.Document>('Goal', GoalSchema);
