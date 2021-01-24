import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';

@Service()
export default class FollowService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('followModel') private followModel: Models.FollowModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Follow(followerId: string, followingId: string, followType: string): Promise<{ follow: IFollow }> {
    this.logger.silly('Following user/team');

    const followRecord = await this.followModel.findOneAndUpdate(
      { followerId, followingId },
      { followerId, followingId, followType },
      { upsert: true, new: true },
    );

    //Send follow notification if followType === 'user'

    if (followRecord) {
      // @ts-ignore
      const follow = followRecord.toObject();
      return { follow };
    } else {
      throw new Error('Follow failed');
    }
  }

  public async Unfollow(followerId: string, followingId: string): Promise<{ success: boolean }> {
    this.logger.silly('Unfollowing user/team');
    try {
      await this.followModel.findOneAndRemove({ followerId, followingId });

      //Delete following notification

      return { success: true };
    } catch (e) {
      throw new Error('Unfollow failed');
    }
  }

  public async GetFollowersAndFollowings(userId: string): Promise<{ followers: IFollow[]; following: IFollow[] }> {
    const followers = await this.followModel.find({ followerId: userId });
    const following = await this.followModel.find({ followingId: userId });
    return { followers, following };
  }
}
