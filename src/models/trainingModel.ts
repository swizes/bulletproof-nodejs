import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { ITraining } from '../interfaces/ITraining';
import Event from './eventModel';

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
  type: 'ObjectId',
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: true,
});

// @ts-ignore
Training.post('save', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'training',
    title: doc.title,
    teamId: doc.teamId,
    location: doc.location,
  };

  // @ts-ignore
  Event.create(event).then(
    res => {
      console.log('Training Event Created', res._id);
    },
    err => {
      console.log('Training Event Not Created', err);
    },
  );
});

// @ts-ignore
Training.post('findOneAndUpdate', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'training',
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

Training.post('findOneAndDelete', function (doc) {
  Event.findOneAndDelete({ contentId: doc._id }, null, (err, doc1) => {
    console.log('event deleted');
  });
});

Training.methods = {};

export default mongoose.model<ITraining & mongoose.Document>('Training', Training);
