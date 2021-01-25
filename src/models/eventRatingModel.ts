import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IEventRating } from '../interfaces/IEventRating';

const EventRating = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    givenBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    contentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    contentType: {
      type: String,
      enums: ['match', 'training'],
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

EventRating.methods = {};

export default mongoose.model<IEventRating & mongoose.Document>('EventRating', EventRating);
