import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const EventHappiness = new mongoose.Schema(
  {
    mental: {
      type: Number,
      required: true,
    },
    physical: {
      type: Number,
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    contentId: {
      type: Schema.Types.ObjectId,
    },
    contentType: {
      type: String,
      enums: [
        'match', //match
        'tournament', //tournament
        'training', //training
        'homework', //homework
      ],
      required: [true, 'Type  is missing'],
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

EventHappiness.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('EventHappiness', EventHappiness);
