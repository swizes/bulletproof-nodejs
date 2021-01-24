import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IHomework, IHomeworkInputDTO, IHomeworkSubmissionInputDTO } from '../interfaces/IHomework';
import lodash from 'lodash';

@Service()
export default class HomeworkService {
  constructor(
    @Inject('eventModel') private eventModel: Models.EventModel,
    @Inject('homeworkModel') private homeworkModel: Models.HomeworkModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async PostHomework(homeworkInputDTO: IHomeworkInputDTO, userId: string): Promise<{ homework: IHomework }> {
    const logStr = 'PostHomework';
    this.logger.silly(logStr);
    //ToDo Notification
    const homeworkRecord = await this.homeworkModel.create({
      ...homeworkInputDTO,
      creatorId: userId,
    });

    if (homeworkRecord) {
      // @ts-ignore
      const homework = homeworkRecord.toObject();
      return { homework };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async UpdateHomework(homeworkInputDTO: IHomeworkInputDTO, _id: string): Promise<{ homework: IHomework }> {
    const logStr = 'UpdateHomework';
    this.logger.silly(logStr);
    const homeworkRecord = await this.homeworkModel.findByIdAndUpdate(
      _id,
      {
        ...homeworkInputDTO,
      },
      { new: true, upsert: true },
    );

    if (homeworkRecord) {
      // @ts-ignore
      const homework = homeworkRecord.toObject();
      return { homework };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteHomework(_id: string): Promise<{ homework: IHomework }> {
    const logStr = 'DeleteHomework';
    this.logger.silly(logStr);
    try {
      await this.homeworkModel.findByIdAndDelete(_id);

      return null;
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetHomework(_id: string): Promise<{ homework: IHomework }> {
    const logStr = 'GetHomework';
    this.logger.silly(logStr);
    try {
      const homeworkRecord = await this.homeworkModel.findById(_id);

      if (homeworkRecord) {
        // @ts-ignore
        const homework = homeworkRecord.toObject();
        return { homework };
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetHomeworks(teamId: string): Promise<{ homeworks: IHomework[] }> {
    const logStr = 'GetHomeworks';
    this.logger.silly(logStr);
    try {
      const homeworkRecords = await this.homeworkModel.find({ teamId });

      if (homeworkRecords) {
        // @ts-ignore
        const homeworks = homeworkRecords.toObject();
        return { homeworks };
      } else {
        return { homeworks: [] };
      }
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }

  public async UpdateHomeworkVideo(_id: string, videoUrl: string): Promise<{ homework: IHomework }> {
    const logStr = 'UpdateHomeworkVideo';
    this.logger.silly(logStr);
    try {
      const homeworkRecord = await this.homeworkModel.findByIdAndUpdate(_id, { videoUrl });

      if (homeworkRecord) {
        // @ts-ignore
        const homework = homeworkRecord.toObject();
        return { homework };
      } else {
        return { homework: null };
      }
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }

  public async PostHomeworkSubmission(
    homeworkId: string,
    homeworkSubmissionInputDTO: IHomeworkSubmissionInputDTO,
    currentUserId: string,
  ): Promise<{ homework: IHomework }> {
    const logStr = 'PostHomeworkSubmission';
    this.logger.silly(logStr);
    try {
      const doc = await this.homeworkModel.findById(homeworkId);

      const submissionIndex = lodash.findIndex(doc.submissions, ['userId', currentUserId]);

      if (submissionIndex !== -1) {
        doc.submissions[submissionIndex] = {
          ...homeworkSubmissionInputDTO,
          userId: currentUserId,
        };
      } else {
        doc.submissions.push({
          ...homeworkSubmissionInputDTO,
          userId: currentUserId,
        });
      }

      const homeworkRecord = await this.homeworkModel.findByIdAndUpdate(homeworkId, { submissions: doc.submissions });

      if (homeworkRecord) {
        // @ts-ignore
        const homework = homeworkRecord.toObject();
        return { homework };
      } else {
        return { homework: null };
      }
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }

  public async PostHomeworkSubmissionFeedback(
    submissionId: string,
    feedback: string,
    rating: string,
    coachId: string,
  ): Promise<{ homework: IHomework }> {
    const logStr = 'PostHomeworkSubmissionFeedback';
    this.logger.silly(logStr);
    try {
      const homeworkRecord = await this.homeworkModel.findOneAndUpdate(
        {
          'submissions._id': submissionId,
        },
        {
          'submissions.$.feedback': feedback,
          'submissions.$.rating': rating,
          'submissions.$.coachId': coachId,
        },
      );

      if (homeworkRecord) {
        // @ts-ignore
        const homework = homeworkRecord.toObject();
        return { homework };
      } else {
        return { homework: null };
      }
    } catch (e) {
      throw new Error(logStr + ' failed');
    }
  }
}
