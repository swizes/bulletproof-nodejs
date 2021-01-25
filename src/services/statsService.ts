import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import mongoose from 'mongoose';

@Service()
export default class StatsService {
  constructor(
    @Inject('goalModel') private goalModel: Models.GoalModel,
    @Inject('substitutionModel') private substitutionModel: Models.SubstitutionModel,
    @Inject('otherMatchEventModel') private otherMatchEventModel: Models.OtherMatchEventModel,
    @Inject('bookingModel') private bookingModel: Models.BookingModel,
    @Inject('matchModel') private matchModel: Models.MatchModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async GetPlayerStats(teamId: string, userId: string) {
    this.logger.silly('Getting Team Events');

    let minuteStats = await this.matchModel.aggregate([
      {
        $match: {
          'squad.userId': new mongoose.Types.ObjectId(userId),
          teamId: new mongoose.Types.ObjectId(userId),
          isFinished: true,
        },
      },
      {
        $unwind: '$squad',
      },
      {
        $match: {
          $and: [
            { 'squad.userId': new mongoose.Types.ObjectId(userId) },
            {
              $or: [{ 'squad.minute': { $gte: 1 } }, { 'squad.onField': true }],
            },
          ],
        },
      },

      {
        $project: {
          _id: 0,
          minute: '$squad.minute',
        },
      },
      {
        $group: {
          _id: '',
          minutesPerMatch: { $avg: '$minute' },
          totalMinutes: { $sum: '$minute' },
          games: { $sum: 1 },
        },
      },
    ]);

    if (minuteStats && minuteStats.length) {
      minuteStats = minuteStats[0];
    } else {
      minuteStats = {
        // @ts-ignore
        minutesPerMatch: 0,
        totalMinutes: 0,
        games: 0,
      };
    }

    let goalStats = await this.goalModel.aggregate([
      { $match: { scorer: new mongoose.Types.ObjectId(userId), teamId: new mongoose.Types.ObjectId(teamId) } },
      {
        $group: {
          _id: '$matchId',
          goals: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: '',
          goalPerMatch: { $avg: '$goals' },
          totalGoals: { $sum: '$goals' },
        },
      },
      {
        $project: {
          _id: 0,
          goalPerMatch: {
            $cond: [{ $eq: ['$goalPerMatch', 0] }, 0, '$goalPerMatch'],
          },
          totalGoals: {
            $cond: [{ $eq: ['$totalGoals', 0] }, 0, '$totalGoals'],
          },
        },
      },
    ]);

    if (goalStats && goalStats.length) {
      goalStats = goalStats[0];
    } else {
      goalStats = {
        // @ts-ignore
        goalPerMatch: 0,
        totalGoals: 0,
      };
    }

    let assistStats = await this.goalModel.aggregate([
      { $match: { assist: new mongoose.Types.ObjectId(userId), teamId: new mongoose.Types.ObjectId(teamId) } },
      {
        $group: {
          _id: '$matchId',
          assists: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: '',
          assistPerMatch: { $avg: '$assists' },
          totalAssists: { $sum: '$assists' },
        },
      },
      {
        $project: {
          _id: 0,
          assistPerMatch: {
            $cond: [{ $eq: ['$assistPerMatch', 0] }, 0, '$assistPerMatch'],
          },
          totalAssists: {
            $cond: [{ $eq: ['$totalAssists', 0] }, 0, '$totalAssists'],
          },
        },
      },
    ]);

    if (assistStats && assistStats.length) {
      assistStats = assistStats[0];
    } else {
      assistStats = {
        // @ts-ignore
        assistPerMatch: 0,
        totalAssists: 0,
      };
    }
    return { minuteStats, goalStats, assistStats };
  }

  public async GetTeamStats(teamId: string) {
    this.logger.silly('Getting Team Events');
    const playerMinuteStats = await this.matchModel.aggregate([
      { $match: { teamId: new mongoose.Types.ObjectId(teamId), isFinished: true } },
      {
        $unwind: '$squad',
      },
      {
        $group: {
          _id: '$squad.userId',

          playedMatches: {
            $sum: {
              $cond: [{ $gte: ['$squad.minute', 1] }, 1, 0],
            },
          },
          totalMinute: {
            $sum: {
              $cond: [{ $gte: ['$squad.minute', 1] }, '$squad.minute', 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },

      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: '$_id',
          firstName: '$user.firstName',
          lastName: '$user.lastName',
          profilePicture: '$user.profilePicture',
          _id: 0,
          minutePerMatch: {
            $cond: [
              { $eq: ['$totalMinute', 0] },
              0,
              {
                $divide: ['$totalMinute', '$playedMatches'],
              },
            ],
          },

          totalMinute: 1,
          playedMatches: 1,
          goals: 1,
        },
      },
      {
        $sort: {
          totalMinute: -1,
        },
      },
    ]);

    let teamGoalStats = await this.matchModel.aggregate([
      { $match: { teamId: new mongoose.Types.ObjectId(teamId), isFinished: true } },
      {
        $group: {
          _id: '',
          goalPerMatch: { $avg: '$homeGoals' },
          concededPerMatch: { $avg: '$awayGoals' },
          totalGoals: { $sum: '$homeGoals' },
          totalConceded: { $sum: '$awayGoals' },
        },
      },
      {
        $project: {
          _id: 0,
          goalPerMatch: {
            $cond: [{ $eq: ['$goalPerMatch', 0] }, 0, '$goalPerMatch'],
          },
          concededPerMatch: {
            $cond: [{ $eq: ['$concededPerMatch', 0] }, 0, '$concededPerMatch'],
          },
          totalGoals: {
            $cond: [{ $eq: ['$totalGoals', 0] }, 0, '$totalGoals'],
          },
          totalConceded: {
            $cond: [{ $eq: ['$totalConceded', 0] }, 0, '$totalConceded'],
          },
        },
      },
    ]);

    if (teamGoalStats && teamGoalStats.length) {
      teamGoalStats = teamGoalStats[0];
    } else {
      teamGoalStats = {
        // @ts-ignore
        goalPerMatch: 0,
        concededPerMatch: 0,
        totalGoals: 0,
        totalConceded: 0,
      };
    }

    return { teamGoalStats, playerMinuteStats };
  }

  public async GetMatchWinStats(teamId: string) {
    this.logger.silly('Getting Team Events');
    const data = await this.matchModel.aggregate([
      { $match: { teamId: new mongoose.Types.ObjectId(teamId), isFinished: true } },
    ]);

    return { matches: data };
  }
}
