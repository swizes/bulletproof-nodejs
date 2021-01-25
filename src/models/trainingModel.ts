import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { ITraining } from '../interfaces/ITraining';

const Training = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
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
    videos: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    ],
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    attendances: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
          status: {
            type: Number,
            enums: [
              0, //attending
              1, //not attending
            ],
          },
          _id: false,
        },
      ],
      _id: false,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Training.virtual('team', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
});

Training.methods = {};

export default mongoose.model<ITraining & mongoose.Document>('Training', Training);
