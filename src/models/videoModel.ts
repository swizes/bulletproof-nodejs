import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';

const Message = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    videoUrl: {
      type: String,
      required: true,
    },
    contentId: {
      type: String,
    },
    contentType: {
      type: String,
      enums: [
        'match', //match
        'tournament', //tournament
        'training', //training
        'homework', //homework
      ],
      required: [true, 'Type  is missing'],
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Message.methods = {};

export default mongoose.model<IFollow & mongoose.Document>('Message', Message);
