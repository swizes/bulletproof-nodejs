import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IEvent } from '../interfaces/IEvent';

const Event = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
    contentId: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    location: {
      type: {
        address: {
          type: String,
          default: null,
        },
        position: {
          lat: {
            type: Number,
          },
          lng: {
            type: Number,
          },
          default: null,
        },
        placeId: {
          type: String,
          default: null,
        },
      },
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Event.virtual('team', {
  type: 'ObjectId',
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: true,
});

Event.methods = {};

export default mongoose.model<IEvent & mongoose.Document>('Event', Event);
