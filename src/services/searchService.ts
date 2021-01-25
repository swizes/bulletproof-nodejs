import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';

@Service()
export default class SearchService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('teamModel') private teamModel: Models.TeamModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Search(searchKey: string, searchValue: string, currentUserId: string) {
    this.logger.silly('Search');

    try {
      switch (searchKey) {
        case 'user':
          return { result: await this.searchUser(currentUserId, searchValue) };
        case 'team':
          return { result: await this.searchTeam(searchValue) };
        default:
          return { result: [] };
      }
    } catch (e) {
      throw new Error('Search failed');
    }
  }

  private async searchTeam(searchValue: string) {
    const match = {};

    if (searchValue !== '') {
      match['name'] = { $regex: searchValue.toString(), $options: 'i' };
    }

    const teams = await this.teamModel.aggregate([
      {
        $match: match,
      },
      {
        $addFields: {
          type: 'team',
        },
      },
    ]);
    return teams;
  }

  private async searchUser(currentUserId: string, searchValue: string) {
    const match = {
      _id: { $ne: currentUserId },
    };

    if (searchValue !== '') {
      match['$or'] = [
        { firstName: { $regex: searchValue.toString(), $options: 'i' } },
        { lastName: { $regex: searchValue.toString(), $options: 'i' } },
      ];
    }

    const users = await this.userModel.aggregate([
      {
        $match: match,
      },
    ]);

    return users;
  }
}
