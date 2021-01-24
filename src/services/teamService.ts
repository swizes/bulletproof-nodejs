import { Inject, Service } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { ITeam, ITeamInputDTO, ITeamJoinMemberDTO } from '../interfaces/ITeam';
import { Logger } from 'winston';
import Team from '../models/teamModel';

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

  public async UpdateTeam(teamId: string, updateDTO: ITeamInputDTO): Promise<{ team: ITeam }> {
    this.logger.silly('Updating user');
    const teamRecord = await this.teamModel.findByIdAndUpdate(teamId, { ...updateDTO }, { upsert: true, new: true });
    // @ts-ignore
    const team = teamRecord.toObject();
    if (teamRecord) {
      return { team };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async DeleteTeam(teamId: string, owner: string): Promise<{ success: boolean }> {
    try {
      this.logger.silly('Deleting Team');
      await this.teamModel.findOneAndDelete({ teamId, owner });
      return { success: true };
    } catch (e) {
      throw new Error('Could not delete the team');
    }
  }

  public async GetTeam(teamId: string): Promise<{ team: ITeam }> {
    this.logger.silly('Getting Team');
    const teamRecord = await this.teamModel.findById(teamId);
    const team = teamRecord.toObject();

    if (teamRecord) {
      return { team };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async GetTeamByCode(invitationCode: string): Promise<{ team: ITeam }> {
    this.logger.silly('Getting Team');
    const teamRecord = await this.teamModel.findOne({ invitationCode });
    const team = teamRecord.toObject();

    if (teamRecord) {
      return { team };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async GetTeams(userId: string): Promise<{ teams: ITeam[] }> {
    this.logger.silly('Getting Team');
    const teamRecords = await this.teamModel.find({ 'members.userId': userId });
    // @ts-ignore
    const teams = teamRecords.toObject();

    if (teamRecords) {
      return { teams };
    } else {
      throw new Error('Team does not exist');
    }
  }

  public async RefreshInvitationCode(teamId: string, userId: string): Promise<{ invitationCode: string }> {
    this.logger.silly('Refreshing Invitation Code');
    const teamRecord = await this.teamModel
      .findOneAndUpdate(
        { teamId, 'members.userId': userId },
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

  public async GetInvitationCode(teamId: string): Promise<{ invitationCode: string }> {
    this.logger.silly('Refreshing Invitation Code');
    const teamRecord = await this.teamModel.findById(teamId).select('+invitationCode');

    if (!teamRecord) {
      throw new Error('Could not get new code. You are not owner or team does not exist');
    } else {
      const team = teamRecord.toObject();
      return { invitationCode: team.invitationCode };
    }
  }

  public async GetMember(teamId: string, userId: string) {
    this.logger.silly('Getting Member Item');

    const teamRecord = await this.teamModel.findOne(
      { teamId, 'members.userId': userId },
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

  public async UpdateMember(teamId: string, userId: string, memberObject: any) {
    this.logger.silly('Update Member Item');

    return Team.findOne({ teamId, 'members.userId': userId }).then(
      team => {
        const memberIndex = team.members.map(item => item.userId).indexOf(userId);
        team.members[memberIndex] = memberObject;
        team.save();
        return { team };
      },
      err => {
        throw new Error('Could not Update member  item. Either member does not exist or team does not exist ');
      },
    );
  }

  public async GetAllMembers(teamId: string) {
    this.logger.silly('Getting All Team Members');

    const teamRecord = await this.teamModel.findById({ teamId });

    if (!teamRecord) {
      throw new Error('Could not get members. Team does not exist ');
    } else {
      const team = teamRecord.toObject();

      return { data: team.members };
    }
  }

  public async LeaveTeam(teamId: string, userId: string): Promise<{ success: boolean }> {
    await this.teamModel.findByIdAndUpdate(teamId, {
      $pull: { members: { userId } },
    });

    //ToDo:  Remove joined  team notification

    return { success: true };
  }

  public async JoinTeam(teamId: string, teamJoinMemberDTO: ITeamJoinMemberDTO): Promise<{ team: ITeam }> {
    const {
      userId,
      isPlayer,
      selectedPos = {
        position: null,
      },
      selectedStyle,
    } = teamJoinMemberDTO;

    const teamRecord = await this.teamModel.findByIdAndUpdate(
      teamId,
      {
        $addToSet: {
          members: {
            userId,
            mainRole: isPlayer ? 1 : 0,
            position: isPlayer ? selectedPos.position : null,
            style: isPlayer ? selectedStyle : null,
          },
        },
      },
      { new: true, upsert: true },
    );

    if (!teamRecord) {
      throw new Error('Could not get members. Team does not exist ');
    } else {
      // @ts-ignore
      const team = teamRecord.toObject();

      return { team };
    }
  }

  public async RemoveMember(teamId: string, userId: string): Promise<{ team: ITeam }> {
    const teamRecord = await this.teamModel.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: { userId } },
      },
      { new: true, upsert: true },
    );
    //ToDo:  Remove joined  team notification
    if (!teamRecord) {
      throw new Error('Could not get members. Team does not exist ');
    } else {
      // @ts-ignore
      const team = teamRecord.toObject();

      return { team };
    }
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
