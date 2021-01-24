import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';
import { IEvent } from '../interfaces/IEvent';
import { IHomework, IHomeworkInputDTO } from '../interfaces/IHomework';
import { INotification } from '../interfaces/INotification';
import { IDevice } from '../interfaces/IDevice';

@Service()
export default class DeviceService {
  constructor(
    @Inject('deviceModel') private deviceModel: Models.DeviceModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async SetDeviceNotificationToken(deviceId: string, token: string): Promise<{ device: IDevice }> {
    const logStr = 'SetDeviceNotificationToken';
    this.logger.silly(logStr);
    const deviceRecord = await this.deviceModel.findOneAndUpdate({ deviceId }, { token }, { upsert: true, new: true });

    if (deviceRecord) {
      // @ts-ignore
      const device = deviceRecord.toObject();
      return { device };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async AddUserToDeviceNotificationToken(deviceId: string, userId: string): Promise<{ device: IDevice }> {
    const logStr = 'AddUserToDeviceNotificationToken';
    this.logger.silly(logStr);
    const deviceRecord = await this.deviceModel.findOneAndUpdate(
      { deviceId },
      { $addToSet: { userIds: userId } },
      { upsert: true, new: true },
    );

    if (deviceRecord) {
      // @ts-ignore
      const device = deviceRecord.toObject();
      return { device };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteUserFromDeviceNotificationToken(deviceId: string, userId): Promise<{ device: IDevice }> {
    const logStr = 'DeleteUserFromDeviceNotificationToken';
    this.logger.silly(logStr);
    const deviceRecord = await this.deviceModel.findOneAndUpdate(
      { deviceId },
      { $pull: { userIds: userId } },
      { upsert: true, new: true },
    );

    if (deviceRecord) {
      // @ts-ignore
      const device = deviceRecord.toObject();
      return { device };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
}
