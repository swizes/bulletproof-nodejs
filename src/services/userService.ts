import { Inject, Service } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';

/**
 * Removed from constructor
 * private mailer: MailerService,
 *
 *
 */
@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,

    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async GetUser(userId: string): Promise<{ user: IUser }> {
    this.logger.silly('GetUser');
    const userRecord = await this.userModel.findById(userId);

    // @ts-ignore
    const user = userRecord;
    if (userRecord) {
      return { user };
    } else {
      throw new Error('GetUser failed');
    }
  }

  public async DeleteUser(userInputDTO: IUserInputDTO): Promise<{ data: string }> {
    if (true) {
      return { data: 'a' };
    } else {
      throw new Error('Invalid Password');
    }
  }

  //ToDo:    const user = userRecord is  not working
  public async UpdateUser(_id: string, updateDTO: IUser): Promise<{ user: IUser }> {
    this.logger.silly('Updating user');
    const userRecord = await this.userModel.findByIdAndUpdate(_id, { ...updateDTO }, { upsert: true, new: true });

    // @ts-ignore
    const user = userRecord.toObject();
    if (userRecord) {
      return { user };
    } else {
      throw new Error('User does not exist');
    }
  }
}
