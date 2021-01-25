import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IEventHappiness } from '../interfaces/IEventHappiness';

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

EventHappiness.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

EventHappiness.methods = {};

export default mongoose.model<IEventHappiness & mongoose.Document>('EventHappiness', EventHappiness);
