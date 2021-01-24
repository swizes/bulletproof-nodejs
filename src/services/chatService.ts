import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IChat } from '../interfaces/IChat';
import mongoose from 'mongoose';
import { IMessage } from '../interfaces/IMessage';

@Service()
export default class ChatService {
  constructor(
    @Inject('chatModel') private chatModel: Models.ChatModel,
    @Inject('messageModel') private messageModel: Models.MessageModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async GetUserChat(requesterId: string, recipientId: string): Promise<{ chat: IChat }> {
    const logStr = 'GetChat';
    this.logger.silly(logStr);
    const chatRecord = await this.chatModel.findOne({
      userIds: {
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(requesterId.toString()) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(recipientId.toString()) } },
        ],
      },
    });

    if (chatRecord) {
      // @ts-ignore
      const chat = chatRecord.toObject();
      return { chat };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetChats(userId: string): Promise<{ chats: IChat[] }> {
    const logStr = 'GetChats';
    this.logger.silly(logStr);
    const chatRecords = await this.chatModel
      .find({ userIds: { $elemMatch: { $eq: mongoose.Types.ObjectId(userId.toString()) } } })
      .populate({
        path: 'lastMessageId',
        populate: {
          path: 'user',
        },
      });

    if (chatRecords) {
      // @ts-ignore
      const chats = chatRecords.toObject();
      return { chats };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  //ToDo: populate user firstname,lastname,id in virtuals in group chat it is neccessary
  public async GetMessages(chatId: string): Promise<{ messages: IMessage[] }> {
    const logStr = 'GetMessages';
    this.logger.silly(logStr);
    const messageRecords = await this.messageModel.find({ chatId }).sort({ createdAt: -1 });

    if (messageRecords) {
      // @ts-ignore
      const messages = messageRecords.toObject();
      return { messages };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  //ToDo: Socket.io is missing
  public async AddMessage(chatId: string, message: any, userId: string): Promise<{ message: IMessage }> {
    const logStr = 'AddMessage';
    this.logger.silly(logStr);
    const messageRecord = await this.messageModel.create({
      ...message,
    });

    if (messageRecord) {
      // @ts-ignore
      const message = messageRecord.toObject();

      await this.chatModel.findByIdAndUpdate(chatId, {
        lastMessageId: message._id,
        lastMessageDate: message.createdAt,
      });

      /*
        newMessage = await newMessage.populate('user', { firstName: 1,lastName:1, _id: 1 }).execPopulate()
        newMessage.user.name = newMessage.user.fullName
        socketApi.io.emit(chatId,newMessage)
       */

      return { message };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
}
