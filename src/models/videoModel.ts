import mongoose, { Schema } from 'mongoose';
import { IVideo } from '../interfaces/IVideo';

const VideoSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
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

VideoSchema.methods = {};

export default mongoose.model<IVideo & mongoose.Document>('Video', VideoSchema);
