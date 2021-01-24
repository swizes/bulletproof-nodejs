import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IDevice } from '../interfaces/IDevice';
import { IMatch, IMatchInputDTO } from '../interfaces/IMatch';

@Service()
export default class MatchService {
  constructor(
    @Inject('matchModel') private matchModel: Models.MatchModel,
    @Inject('teamModel') private teamModel: Models.TeamModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async CreateMatch(matchInputDTO: IMatchInputDTO, userId: string): Promise<{ match: IMatch }> {
    const logStr = 'CreateMatch';
    this.logger.silly(logStr);

    const team = await this.teamModel.findById(matchInputDTO.teamId);

    matchInputDTO.title = team.name + ' vs ' + matchInputDTO.opponentName;
    matchInputDTO.creatorId = userId;
    const matchRecord = await this.matchModel.create({
      ...matchInputDTO,
    });

    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async UpdateMatch(matchId: string, data: any): Promise<{ match: IMatch }> {
    const logStr = 'UpdateMatch';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findByIdAndUpdate(matchId, {
      ...data,
    });

    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteMatch(matchId: string): Promise<{ match: IMatch }> {
    const logStr = 'DeleteMatch';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findByIdAndDelete(matchId);

    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetMatch(matchId: string): Promise<{ match: IMatch }> {
    const logStr = 'DeleteMatch';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findById(matchId);

    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetMatches(teamId: string): Promise<{ matches: IMatch[] }> {
    const logStr = 'DeleteMatch';
    this.logger.silly(logStr);

    const matchRecords = await this.matchModel.find({ teamId });

    if (matchRecords) {
      // @ts-ignore
      const matches = matchRecords.toObject();
      return { matches };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async UpdateTimer(matchId: string, timer: any): Promise<{ match: IMatch }> {
    const logStr = 'DeleteMatch';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findByIdAndUpdate(matchId, { timer }, { new: true });

    //ToDo: Socket here
    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async AddExtraTime(matchId: string, extraTime: number): Promise<{ match: IMatch }> {
    const logStr = 'AddExtraTime';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findByIdAndUpdate(matchId, { $inc: { extraTime } }, { new: true });

    //ToDo: Socket here#
    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async FinishMatch(matchId: string, minute: number): Promise<{ match: IMatch }> {
    const logStr = 'AddExtraTime';
    this.logger.silly(logStr);

    let matchRecord = await this.matchModel.findById(matchId);

    if (matchRecord) {
      // @ts-ignore
      let match = matchRecord.toObject();

      for (let i = 0; i < match.squad.length; i++) {
        const item = match.squad[i];

        if (item.onField) {
          match.squad[i].minute = minute - item.minute;
        }
      }

      match.isFinished = true;
      match.timer.endTime = Date.now();

      if (match.homeGoals > match.awayGoals) {
        match.result = 'win';
      } else if (match.homeGoals < match.awayGoals) {
        match.result = 'loss';
      } else {
        match.result = 'draw';
      }

      matchRecord = await this.matchModel.findByIdAndUpdate(matchId, match, { new: true });

      match = matchRecord.toObject();
      //ToDo: Socket here
      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async ResetMatch(matchId: string): Promise<{ match: IMatch }> {
    const logStr = 'AddExtraTime';
    this.logger.silly(logStr);

    const matchRecord = await this.matchModel.findByIdAndUpdate(matchId, {
      goals: [],
      subs: [],
      bookings: [],
      others: [],
      awayGoals: 0,
      homeGoals: 0,
      timer: {
        startTime: null,
        pauseTime: null,
        endTime: null,
      },
      extraTime: 0,
    });
    /*
    await Goal.deleteMany({ matchId: id })
    await Substitution.deleteMany({ matchId: id })
    await Booking.deleteMany({ matchId: id })
    await OtherMatchEvents.deleteMany({ matchId: id })

     */

    //ToDo: Socket here#
    if (matchRecord) {
      // @ts-ignore
      const match = matchRecord.toObject();

      return { match };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
}
