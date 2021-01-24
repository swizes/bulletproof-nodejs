import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';
import { IEvent } from '../interfaces/IEvent';
import { IEventHappiness, IEventHappinessDTO } from '../interfaces/IEventHappiness';
import event from '../models/eventModel';
import * as mongoose from 'mongoose';

@Service()
export default class EventHappinessService {
  constructor(
    @Inject('eventHappinessModel') private eventHappinessModel: Models.EventHappinessModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async PostEventHappiness(eventHappinessDTO: IEventHappinessDTO): Promise<{ eventHappiness: IEventHappiness }> {
    const logStr = 'Adding Event Happiness';
    this.logger.silly(logStr);
    const eventHappinessRecord = await this.eventHappinessModel.create({
      ...eventHappinessDTO,
    });

    if (eventHappinessRecord) {
      // @ts-ignore
      const eventHappiness = eventHappinessRecord.toObject();
      return { eventHappiness };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetEventHappiness(userId: string, contentId: string): Promise<{ eventHappiness: IEventHappiness }> {
    const logStr = 'Get Event Happiness';
    this.logger.silly(logStr);
    const eventHappinessRecord = await this.eventHappinessModel.findOne({
      userId,
      contentId,
    });

    if (eventHappinessRecord) {
      // @ts-ignore
      const eventHappiness = eventHappinessRecord.toObject();
      return { eventHappiness };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetAllEventHappiness(contentId: string): Promise<{ eventHappiness: IEventHappiness[] }> {
    const logStr = 'GetAllEventHappiness';
    this.logger.silly(logStr);
    const eventHappinessRecords = await this.eventHappinessModel.find({
      contentId,
    });

    if (eventHappinessRecords) {
      // @ts-ignore
      const eventHappiness = eventHappinessRecords.toObject();
      return { eventHappiness };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetUserHappinessAvg(
    userId: string,
    teamId: string,
  ): Promise<{ physicalAvg: number; mentalAvg: number }> {
    const logStr = 'GetUserHappinessAvg';
    this.logger.silly(logStr);

    const eventStatsRecords = await this.eventHappinessModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          teamId: new mongoose.Types.ObjectId(teamId),
        },
      },
      {
        $group: {
          _id: '',
          physicalAvg: {
            $avg: '$physical',
          },
          mentalAvg: {
            $avg: '$mental',
          },
        },
      },
    ]);

    if (eventStatsRecords) {
      // @ts-ignore

      let eventStats = {
        physicalAvg: null,
        mentalAvg: null,
      };
      if (eventStatsRecords.length > 0) {
        eventStats = eventStatsRecords[0];
      }

      const { physicalAvg = null, mentalAvg = null } = eventStats;
      return { physicalAvg, mentalAvg };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetTeamHappinessAvg(teamId: string): Promise<{ physicalAvg: number; mentalAvg: number }> {
    const logStr = 'GetTeamHappinessAvg';
    this.logger.silly(logStr);

    const eventStatsRecords = await this.eventHappinessModel.aggregate([
      {
        $match: {
          teamId: new mongoose.Types.ObjectId(teamId),
        },
      },
      {
        $group: {
          _id: '',
          physicalAvg: {
            $avg: '$physical',
          },
          mentalAvg: {
            $avg: '$mental',
          },
        },
      },
    ]);

    if (eventStatsRecords) {
      // @ts-ignore

      let eventStats = {
        physicalAvg: null,
        mentalAvg: null,
      };
      if (eventStatsRecords.length > 0) {
        eventStats = eventStatsRecords[0];
      }

      const { physicalAvg = null, mentalAvg = null } = eventStats;
      return { physicalAvg, mentalAvg };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
}
