import mongoose, { Schema } from 'mongoose';
import { IGoal } from '../interfaces/IGoal';
import { ISubstitution } from '../interfaces/ISubstitution';

const SubstitutionSchema = new mongoose.Schema(
  {
    in: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    out: {
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
      default: 'substitution',
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

SubstitutionSchema.methods = {};

export default mongoose.model<ISubstitution & mongoose.Document>('Substitution', SubstitutionSchema);
