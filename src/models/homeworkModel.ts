import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IHomework } from '../interfaces/IHomework';
import { ITraining } from '../interfaces/ITraining';
import Event from './eventModel';

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
  type: 'ObjectId',
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: true,
});

// @ts-ignore
Homework.post('save', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'homework',
    title: doc.title,
    teamId: doc.teamId,
    location: doc.location,
  };

  // @ts-ignore
  Event.create(event).then(
    res => {
      console.log('homework Event Created', res._id);
    },
    err => {
      console.log('homework Event Not Created', err);
    },
  );
});

// @ts-ignore
Homework.post('findOneAndUpdate', (doc: ITraining) => {
  const event = {
    contentId: doc._id,
    startDate: doc.startDate,
    endDate: doc.endDate,
    contentType: 'homework',
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

Homework.post('findOneAndDelete', function (doc) {
  Event.findOneAndDelete({ contentId: doc._id }, null, (err, doc1) => {
    console.log('event deleted');
  });
});

Homework.methods = {};

export default mongoose.model<IHomework & mongoose.Document>('Homework', Homework);
