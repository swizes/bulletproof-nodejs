import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IHomework, IHomeworkInputDTO } from '../interfaces/IHomework';
import { ITraining, ITrainingInputDTO } from '../interfaces/ITraining';
import { rejects } from 'assert';

@Service()
export default class TrainingService {
  constructor(
    @Inject('trainingModel') private trainingModel: Models.TrainingModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async CreateTraining(
    trainingInputDTO: ITrainingInputDTO,
    currentUserId: string,
  ): Promise<{ training: ITraining }> {
    const logStr = 'CreateTraining';
    this.logger.silly(logStr);
    const trainingRecord = await this.trainingModel.create({
      ...trainingInputDTO,
    });

    if (trainingRecord) {
      // @ts-ignore
      const training = trainingRecord
      return { training };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async UpdateTraining(
    trainingInputDTO: ITrainingInputDTO,
    trainingId: string,
  ): Promise<{ training: ITraining }> {
    const logStr = 'UpdateTraining';
    this.logger.silly(logStr);
    const trainingRecord = await this.trainingModel.findByIdAndUpdate(trainingId, {
      ...trainingInputDTO,
    });

    if (trainingRecord) {
      // @ts-ignore
      const training = trainingRecord
      return { training };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async DeleteTraining(trainingId: string): Promise<{ training: ITraining }> {
    const logStr = 'DeleteTraining';
    this.logger.silly(logStr);
    const trainingRecord = await this.trainingModel.findByIdAndDelete(trainingId);

    if (trainingRecord) {
      // @ts-ignore
      const training = trainingRecord
      return { training };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  public async GetTraining(trainingId: string): Promise<{ training: ITraining }> {
    const logStr = 'GetTraining';
    this.logger.silly(logStr);
    const trainingRecord = await this.trainingModel.findById(trainingId).populate('team');

    if (trainingRecord) {
      // @ts-ignore
      const training = trainingRecord
      return { training };
    } else {
      throw new Error(logStr + ' failed');
    }
  }
  public async GetTrainings(teamId: string): Promise<{ trainings: ITraining[] }> {
    const logStr = 'GetTrainings';
    this.logger.silly(logStr);
    const trainingRecords = await this.trainingModel.find({ teamId }).populate('team');

    if (trainingRecords) {
      // @ts-ignore
      const trainings = trainingRecords.toObject();
      return { trainings };
    } else {
      throw new Error(logStr + ' failed');
    }
  }

  //ToDo: reject or throw in promise block

  public async SetAttendance(trainingId: string, userId: string, status: number): Promise<{ training: ITraining }> {
    const logStr = 'SetAttendance';
    this.logger.silly(logStr);

    return new Promise((resolve, reject) => {
      try {
        this.trainingModel.findOne(
          { _id: trainingId, 'attendances.userId': userId },
          {},
          // @ts-ignore
          { arrayFilters: [{ 'attendances.userId': userId }], useFindAndModify: false },
          async (err, section) => {
            // check if section was found
            console.log(err);
            console.log(section);

            let doc = null;
            if (!section) {
              console.log('not found');
              doc = await this.trainingModel.findOneAndUpdate(
                { _id: trainingId },
                {
                  $addToSet: {
                    attendance: {
                      userId,
                      status,
                    },
                  },
                },
                { new: true },
              );
            } else {
              doc = await this.trainingModel.findOneAndUpdate(
                { _id: trainingId, 'attendance.userId': userId },
                { $set: { 'attendance.$.userId': userId, 'attendance.$.status': status } },
                { new: true },
              );
            }

            const training = doc;

            resolve({ training });
          },
        );
      } catch (e) {
        throw new Error(logStr + ' failed');
      }
    });
  }
}
