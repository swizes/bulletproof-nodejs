import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IFollow } from '../interfaces/IFollow';
import { IEvent } from '../interfaces/IEvent';
import { IHomework, IHomeworkInputDTO } from '../interfaces/IHomework';
import { INotification } from '../interfaces/INotification';

@Service()
export default class NotificationService {
  constructor(
    @Inject('notificationModel') private notificationModel: Models.NotificationModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async GetNotification(notificationId: string): Promise<{ notification: INotification }> {
    const logStr = 'GetNotification';
    this.logger.silly(logStr);
    const notificationRecord = await this.notificationModel.findById(notificationId);

    if (notificationRecord) {
      // @ts-ignore
      const notification = notificationRecord;
      return { notification };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetNotifications(userId: string): Promise<{ notifications: INotification[] }> {
    const logStr = 'GetNotifications';
    this.logger.silly(logStr);
    const notificationRecords = await this.notificationModel.find({ userId });

    if (notificationRecords) {
      // @ts-ignore
      const notifications = notificationRecords.toObject();
      return { notifications };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async MarkAsRead(notificationId: string): Promise<{ notification: INotification }> {
    const logStr = 'MarkAsRead';
    this.logger.silly(logStr);
    const notificationRecord = await this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true });

    if (notificationRecord) {
      // @ts-ignore
      const notification = notificationRecord;
      return { notification };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetUnreadNotificationAmount(userId: string): Promise<{ unreadAmount: number }> {
    const logStr = 'GetUnreadNotificationAmount';
    this.logger.silly(logStr);
    const notificationRecords = await this.notificationModel.find({ userId, isRead: false });

    if (notificationRecords) {
      // @ts-ignore
      const notifications = notificationRecords.toObject();
      return { unreadAmount: notifications.length };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteNotification(notificationId: string): Promise<{ notification: INotification }> {
    const logStr = 'DeleteNotification';
    this.logger.silly(logStr);
    const notificationRecord = await this.notificationModel.findByIdAndDelete(notificationId);

    if (notificationRecord) {
      // @ts-ignore
      const notification = notificationRecord;
      return { notification };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteNotifications(userId: string): Promise<{ notifications: INotification[] }> {
    const logStr = 'DeleteNotifications';
    this.logger.silly(logStr);
    const notificationRecord = await this.notificationModel.deleteMany({ userId });
    return { notifications: [] };
  }
}
