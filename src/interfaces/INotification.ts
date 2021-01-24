export interface INotification {
  userId: string;
  otherData: any;
  notificationType: string;
  contentId: string;
  title: string;
  body: string;
  isRead: boolean;
}
