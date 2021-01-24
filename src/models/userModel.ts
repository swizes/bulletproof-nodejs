import { IUser } from '../interfaces/IUser';
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: [validator.isEmail, ' Please provide a valid email'],
    },
    birthday: {
      type: Date,
    },
    profilePicture: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    isChild: {
      type: Boolean,
      default: false,
    },
    parentIds: {
      type: [String],
    },
    childIds: {
      type: [String],
    },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

User.virtual('fullName').get(function () {
  return [this.firstName, this.lastName].filter(Boolean).join(' ');
});

User.virtual('age').get(function () {
  return Math.floor((new Date().getTime() - new Date(this.birthday).getTime()) / 3.154e10);
});

User.methods = {
  createAccessToken: async function () {
    return;
  },
  createRefreshToken: async function (req) {
    return;
  },
  correctPassword: async function (typedPassword, originalPassword) {
    return argon2.verify(originalPassword, typedPassword);
  },
};

export default mongoose.model<IUser & mongoose.Document>('User', User);
