import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Match = new mongoose.Schema(
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
        uploadedBy: {
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
    opponentName: String,
    duration: {
      type: Number,
      default: null,
    },
    extraTime: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: null,
    },
    squad: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        minute: {
          type: Number,
          default: 0,
        },
        onField: {
          type: Boolean,
          default: false,
        },
        bookedOut: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
    subs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Substitution' }],
      default: [],
    },
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    others: [{ type: Schema.Types.ObjectId, ref: 'OtherMatchEvent' }],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    timer: {
      startTime: {
        type: Number,
        default: null,
      },
      pauseTime: {
        type: Number,
        default: null,
      },
      endTime: {
        type: Number,
        default: null,
      },
      _id: false,
    },
    awayGoals: {
      type: Number,
      default: 0,
    },
    homeGoals: {
      type: Number,
      default: 0,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    result: {
      type: String,
      enums: ['win', 'draw', 'loss'],
      default: null,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Match.virtual('team', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
});

Match.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Match', Match);
