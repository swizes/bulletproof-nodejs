export interface IMessage {
  userId: string;
  chatId: string;
  text: string;
  image: string;
  video: string;
  audio: string;
  system: boolean;
  sent: boolean;
  received: boolean;
  pending: boolean;
  deletedBy: string[];
  receivedBy: [
    {
      userId: string;
      timestamp: number;
    },
  ];
  readBy: [
    {
      userId: string;
      timestamp: number;
    },
  ];
}
