import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IMatch } from '../interfaces/IMatch';
import Match from '../models/matchModel';

@Service()
export default class MatchEventService {
  constructor(
    @Inject('goalModel') private goalModel: Models.GoalModel,
    @Inject('substitutionModel') private substitutionModel: Models.SubstitutionModel,
    @Inject('otherMatchEventModel') private otherMatchEventModel: Models.OtherMatchEventModel,
    @Inject('bookingModel') private bookingModel: Models.BookingModel,
    @Inject('matchModel') private matchModel: Models.MatchModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async CreateMatchEvent(matchId: string, eventData: string, eventType: string): Promise<{ match: IMatch }> {
    const logStr = 'CreateMatchEvent';
    this.logger.silly(logStr);
    let match = null;
    switch (eventType) {
      case 'goal':
        match = await this.createGoal(matchId, eventData);
        break;
      case 'booking':
        match = await this.createBooking(matchId, eventData);
        break;
      case 'sub':
        match = await this.createSub(matchId, eventData);
        break;
      case 'other':
        match = await this.createOther(matchId, eventData);
        break;
      default:
        throw new Error(logStr + ' failed');
    }

    return { match };
  }

  private async createGoal(matchId, data) {
    const doc = await this.goalModel.create(data);

    const side = data.side;

    let update = {
      $addToSet: { goals: doc._id },
    };

    if (side === 'home') {
      update = {
        ...update,
        // @ts-ignore
        $inc: { homeGoals: 1 },
      };
    } else {
      update = {
        ...update,
        // @ts-ignore
        $inc: { awayGoals: 1 },
      };
    }

    const match = await this.matchModel.findByIdAndUpdate(matchId, update, { new: true });
    return match;
  }
  private async createSub(matchId, data) {
    const doc = await this.substitutionModel.create(data);

    const match = await this.matchModel.findById(matchId);

    match.subs.push(doc._id);

    const inIndex = match.squad.findIndex(item => item.userId === doc.in);
    const outIndex = match.squad.findIndex(item => item.userId === doc.out);

    match.squad[inIndex].onField = true;
    match.squad[inIndex].minute = doc.minute - match.squad[inIndex].minute;

    match.squad[outIndex].onField = false;
    match.squad[outIndex].minute = doc.minute - match.squad[outIndex].minute;

    const updatedMatch = await Match.findByIdAndUpdate(matchId, match, { new: true });
    return updatedMatch;
  }
  private async createBooking(matchId, data) {
    const doc = await this.bookingModel.create(data);

    const match = await this.matchModel.findByIdAndUpdate(matchId, { $addToSet: { bookings: doc._id } }, { new: true });

    return match;
  }
  private async createOther(matchId, data) {
    const doc = await this.otherMatchEventModel.create(data);
    const match = await Match.findByIdAndUpdate(matchId, { $addToSet: { others: doc._id } }, { new: true });
    return match;
  }
}
