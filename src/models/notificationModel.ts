import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Notification = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    otherData: {
      type: {},
    },
    notificationType: {
      type: String,
      enums: [
        'follow',
        'match',
        'homework',
        'training',
        'teamJoin',
        'homeworkFeedback',
        'eventRating',
        'eventHappiness',
      ],
    },
    contentId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Notification.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Notification', Notification);
