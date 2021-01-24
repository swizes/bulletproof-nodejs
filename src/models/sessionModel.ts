import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Session = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastOnline: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Session.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Session', Session);
