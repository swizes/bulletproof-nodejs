import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IDevice } from '../interfaces/IDevice';

//ToDo keep only one userId if the request comes from web app
const Device = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: true,
    },
    userIds: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    isMobile: {
      type: Boolean,
      required: true,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Device.methods = {};

export default mongoose.model<IDevice & mongoose.Document>('Device', Device);
