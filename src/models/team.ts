import mongoose, { Schema } from 'mongoose';
import { ITeam } from '../interfaces/ITeam';

const Team = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    shortName: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invitationCode: {
      type: String,
      default: null,
      index: true,
      require: true,
      unique: true,
      select: false,
    },
    members: [
      {
        _id: false,
        uid: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        mainRole: {
          type: 'Number',
          enums: [
            0, //member
            1, //player
            2, //parent
            3, //coach
            4, //player & coach
          ],
          default: 0,
        },
        sideRoles: [
          {
            type: 'Number',
            enums: [
              0, //training_organizer
              1, //match_organizer
              2, //homework_organizer
              3, //member_organizer
            ],
          },
        ],
        child: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
      { _id: false },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ITeam & mongoose.Document>('Team', Team);
