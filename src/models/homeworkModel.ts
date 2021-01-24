import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Homework = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    submissions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        coachId: { type: Schema.Types.ObjectId, ref: 'User' },
        videoUrl: String,
        rating: Number,
        feedback: String,
      },
      { timestamps: true },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Homework.virtual('team', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
});

Homework.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Homework', Homework);
