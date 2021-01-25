import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';
import { IEvent } from '../interfaces/IEvent';

@Service()
export default class EventService {
  constructor(
    @Inject('eventModel') private eventModel: Models.EventModel,
    @Inject('teamModel') private teamModel: Models.TeamModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async GetTeamEvents(teamId: string): Promise<{ events: IEvent[] }> {
    this.logger.silly('Getting Team Events');
    const eventRecords = await this.eventModel
      .find({
        teamId,
      })
      .populate({ path: 'team', select: 'name' });

    if (eventRecords) {
      // @ts-ignore
      const events = eventRecords;
      return { events };
    } else {
      throw new Error('Get Team Events failed');
    }
  }

  public async GetUserEvents(currentUserId: string): Promise<{ events: IEvent[] }> {
    this.logger.silly('Getting User Events');

    //ToDo: Convert this to aggregate, much cleaner
    try {
      const teams = await this.teamModel.find({
        'members.userId': currentUserId,
      });

      let events = [];

      for (const team of teams) {
        const doc = await this.eventModel
          .find({
            teamId: team._id,
          })
          .populate({ path: 'team', select: 'name' });
        events = [...events, ...doc];
      }
      return { events };
    } catch (e) {
      throw new Error('Getting User Events failed');
    }
  }

  public async GetUpcomingTeamEvents(teamId: string): Promise<{ events: IEvent[] }> {
    this.logger.silly('Getting Upcoming Team Events');
    const eventRecords = await this.eventModel
      .find({
        teamId,
      })
      .sort({ startDate: 1 });

    if (eventRecords) {
      // @ts-ignore
      const events = eventRecords;
      return { events };
    } else {
      throw new Error('Getting Upcoming Team Events failed');
    }
  }
}
