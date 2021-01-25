import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IEventRating, IEventRatingDTO } from '../interfaces/IEventRating';

@Service()
export default class EventRatingService {
  constructor(
    @Inject('eventRatingModel') private eventRatingModel: Models.EventRatingModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async PostEventRating(
    currentUserId: string,
    eventRatingDTO: IEventRatingDTO,
  ): Promise<{ eventRating: IEventRating }> {
    const logStr = 'PostEventRating';
    this.logger.silly(logStr);

    const eventRating = await this.eventRatingModel.findOneAndUpdate(
      {
        contentId: eventRatingDTO.contentId,
        userId: eventRatingDTO.userId,
        category: eventRatingDTO.category,
      },
      {
        ...eventRatingDTO,
        givenBy: currentUserId,
      },
      { upsert: true, new: true },
    );

    return { eventRating };
  }

  public async GetEventRatingOfUser(userId: string, contentId: string): Promise<{ eventRating: IEventRating }> {
    const logStr = 'GetEventRatingOfUser';
    this.logger.silly(logStr);
    const eventRatingRecords = await this.eventRatingModel.findOne({
      contentId,
      userId,
    });

    if (eventRatingRecords) {
      const eventRating = eventRatingRecords;
      return { eventRating };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetEventRatings(contentId: string): Promise<{ eventRatings: IEventRating[] }> {
    const logStr = 'GetEventRatings';
    this.logger.silly(logStr);
    const eventRatingRecords = await this.eventRatingModel.find({
      contentId,
    });

    if (eventRatingRecords) {
      // @ts-ignore
      const eventRatings = eventRatingRecords;
      return { eventRatings };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetUserRatings(userId: string, teamId: string): Promise<{ eventRatings: IEventRating[] }> {
    const logStr = 'GetUserRatings';
    this.logger.silly(logStr);
    const eventRatingRecords = await this.eventRatingModel.find({
      teamId,
      userId,
    });

    if (eventRatingRecords) {
      const eventRatings = eventRatingRecords;
      return { eventRatings };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
}
