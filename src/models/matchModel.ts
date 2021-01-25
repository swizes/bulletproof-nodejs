import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IMatch } from '../interfaces/IMatch';
import { ITraining } from '../interfaces/ITraining';
import Event from './eventModel';

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
  type: 'ObjectId',
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: true,
});

// @ts-ignore
Match.post('save', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'match',
    title: doc.title,
    teamId: doc.teamId,
    location: doc.location,
  };

  // @ts-ignore
  Event.create(event).then(
    res => {
      console.log('match Event Created', res._id);
    },
    err => {
      console.log('match Event Not Created', err);
    },
  );
});

// @ts-ignore
Match.post('findOneAndUpdate', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'match',
    title: doc.title,
    teamId: doc.teamId,
    location: doc.location,
  };

  Event.findOneAndUpdate(
    { contentId: event.contentId },
    // @ts-ignore
    { ...event },
    {
      upsert: true,
      new: true,
    },
    (err, doc1, res) => {
      console.log('Event updated');
    },
  );
});

Match.post('findOneAndDelete', function (doc) {
  Event.findOneAndDelete({ contentId: doc._id }, null, (err, doc1) => {
    console.log('event deleted');
  });
});

Match.methods = {};

export default mongoose.model<IMatch & mongoose.Document>('Match', Match);
