import { IUser } from '../interfaces/IUser';
import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IGoal } from '../interfaces/IGoal';
import { IBooking } from '../interfaces/IBooking';

const BookingSchema = new mongoose.Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    card: {
      type: String,
      enums: ['yellow', 'red', 'double_yellow'],
    },
    eventType: {
      type: String,
      default: 'booking',
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

BookingSchema.methods = {};

export default mongoose.model<IBooking & mongoose.Document>('Booking', BookingSchema);
