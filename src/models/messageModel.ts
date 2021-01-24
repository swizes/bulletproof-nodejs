import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Message = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    audio: {
      type: String,
    },
    system: {
      type: Boolean,
      default: false,
    },
    sent: {
      type: Boolean,
      default: false,
    },
    received: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Boolean,
      default: false,
    },
    deletedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    receivedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        timestamp: {
          type: Number,
        },
      },
    ],
    readBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Message.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Message', Message);
