import { Inject, Service } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { ITeam, ITeamInputDTO, ITeamJoinMemberDTO } from '../interfaces/ITeam';
import { Logger } from 'winston';
import Team from '../models/teamModel';

/**
 * Removed from constructor
 * private mailer: MailerService,
 *
 *
 */
@Service()
export default class TeamService {
  constructor(
    @Inject('teamModel') private teamModel: Models.TeamModel,

    @Inject('logger') private logger: Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async CreateTeam(teamInputDTO: ITeamInputDTO, userId: string): Promise<{ team: ITeam }> {
    this.logger.silly('Creating team db record');

    const teamRecord = await this.teamModel.create({
      ...teamInputDTO,
      ownerId: userId,
      members: [{ userId, mainRole: 2, sideRoles: [0, 1, 2, 3], position: null, style: null }],
      invitationCode: await this.generateCode(),
    });

    if (!teamRecord) {
      throw new Error('Team cannot be created');
    }

    const team = teamRecord.toObject();
    return { team };
  }

  public async UpdateTeam(_id: string, updateDTO: ITeamInputDTO): Promise<{ team: ITeam }> {
    this.logger.silly('Updating user');
    const teamRecord = await this.teamModel.findByIdAndUpdate(_id, { ...updateDTO }, { upsert: true, new: true });
    // @ts-ignore
    const team = teamRecord.toObject();
    if (teamRecord) {
      return { team };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async DeleteTeam(_id: string, owner: string): Promise<{ success: boolean }> {
    try {
      this.logger.silly('Deleting Team');
      await this.teamModel.findOneAndDelete({ _id, owner });
      return { success: true };
    } catch (e) {
      throw new Error('Could not delete the team');
    }
  }

  public async GetTeam(query: any): Promise<{ team: ITeam }> {
    this.logger.silly('Getting Team');
    const teamRecord = await this.teamModel.findOne({ ...query });
    const team = teamRecord.toObject();

    if (teamRecord) {
      return { team };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async RefreshInvitationCode(_id: string, userId: string): Promise<{ invitationCode: string }> {
    this.logger.silly('Refreshing Invitation Code');
    const teamRecord = await this.teamModel
      .findOneAndUpdate(
        { _id, 'members.userId': userId },
        {
          invitationCode: await this.generateCode(),
        },
        { new: true },
      )
      .select('+invitationCode');

    if (!teamRecord) {
      throw new Error('Could not get new code. You are not owner or team does not exist');
    } else {
      const team = teamRecord.toObject();
      return { invitationCode: team.invitationCode };
    }
  }

  public async GetInvitationCode(_id: string): Promise<{ invitationCode: string }> {
    this.logger.silly('Refreshing Invitation Code');
    const teamRecord = await this.teamModel.findById(_id).select('+invitationCode');

    if (!teamRecord) {
      throw new Error('Could not get new code. You are not owner or team does not exist');
    } else {
      const team = teamRecord.toObject();
      return { invitationCode: team.invitationCode };
    }
  }

  public async GetMember(_id: string, uid: string) {
    this.logger.silly('Getting Member Item');

    const teamRecord = await this.teamModel.findOne(
      { _id, 'members.uid': uid },
      {
        'members.$': 1,
      },
    );

    if (!teamRecord) {
      throw new Error('Could not get member  item. Either member does not exist or team does not exist ');
    } else {
      const team = teamRecord.toObject();

      return { data: team.members[0] };
    }
  }

  public async UpdateMember(_id: string, userId: string, memberObject: any) {
    this.logger.silly('Update Member Item');

    const teamRecord = await Team.findOne({ _id, 'members.userId': userId }).then(team => {
      const memberIndex = team.members.map(item => item.userId).indexOf(userId);
      team.members[memberIndex] = memberObject;
      team.save();
      return team;
    });

    if (!teamRecord) {
      throw new Error('Could not Update member  item. Either member does not exist or team does not exist ');
    } else {
      const team = teamRecord.toObject();
      return { data: team.members };
    }
  }

  public async GetAllMembers(_id: string) {
    this.logger.silly('Getting All Team Members');

    const teamRecord = await this.teamModel.findById({ _id });

    if (!teamRecord) {
      throw new Error('Could not get members. Team does not exist ');
    } else {
      const team = teamRecord.toObject();

      return { data: team.members };
    }
  }

  public async LeaveTeam(_id: string, userId: string): Promise<{ success: boolean }> {
    await this.teamModel.findByIdAndUpdate(_id, {
      $pull: { members: { userId } },
    });

    //ToDo:  Remove joined  team notification

    return { success: true };
  }

  public async JoinTeam(_id: string, teamJoinMemberDTO: ITeamJoinMemberDTO): Promise<{ success: boolean }> {
    const {
      userId,
      isPlayer,
      selectedPos = {
        position: null,
      },
      selectedStyle,
    } = teamJoinMemberDTO;

    await this.teamModel.findByIdAndUpdate(_id, {
      $addToSet: {
        members: {
          userId,
          mainRole: isPlayer ? 1 : 0,
          position: isPlayer ? selectedPos.position : null,
          style: isPlayer ? selectedStyle : null,
        },
      },
    });

    return { success: true };
  }

  public async RemoveMember(_id: string, userId: string): Promise<{ success: boolean }> {
    await this.teamModel.findByIdAndUpdate(_id, {
      $pull: { members: { userId } },
    });
    //ToDo:  Remove joined  team notification
    return { success: true };
  }

  private async generateCode() {
    let codeExists = true;
    let invitationCode = '';
    while (codeExists) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        invitationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      const team = await this.teamModel.findOne({ invitationCode });
      codeExists = team !== null;
    }
    return invitationCode;
  }
}
