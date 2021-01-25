import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import mongoose from 'mongoose';

@Service()
export default class VideoService {
  constructor(
    @Inject('videoModel') private videoModel: Models.VideoModel,

    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async UploadEventVideo(
    contentType: string,
    contentId: string,
    videoUrl: string,
    teamId: string,
    userId: string,
  ) {
    this.logger.silly('Getting Team Events');
    const video = await this.videoModel.create({
      userId,
      videoUrl,
      contentId,
      contentType,
      teamId,
    });

    return { video };
  }

  public async GetEventVideos(contentId: string) {
    this.logger.silly('Getting Team Events');
    const videos = await this.videoModel.find({
      contentId,
    });
    return { videos };
  }

  public async GetTeamVideos(teamId: string) {
    this.logger.silly('Getting Team Events');
    const videos = await this.videoModel.find({
      teamId,
    });
    return { videos };
  }
}
