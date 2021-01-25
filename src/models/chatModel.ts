import mongoose, { Schema } from 'mongoose';
import { IFollow } from '../interfaces/IFollow';
import { IChat } from '../interfaces/IChat';

const Chat = new mongoose.Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    lastMessageDate: { type: Date },
    groupName: {
      type: String,
      default: null,
    },
    chatType: {
      type: String,
      enums: [
        '1v1', //person
        'group', //group
        'team',
      ],
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

Chat.methods = {};

export default mongoose.model<IChat & mongoose.Document>('Chat', Chat);
