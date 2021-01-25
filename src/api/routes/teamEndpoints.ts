import { Router } from 'express';
import createTeam from './team/createTeam';
import updateTeam from './team/updateTeam';
import getTeam from './team/getTeam';
import deleteTeam from './team/deleteTeam';
import joinTeam from './team/member/joinTeam';
import removeMember from './team/member/removeMember';
import refreshInvitationCode from './team/refreshInvitationCode';
import getInvitationCode from './team/getInvitationCode';
import getMember from './team/member/getMember';
import getAllMembers from './team/member/getAllMembers';
import updateMember from './team/member/updateMember';
import getTeams from './team/getTeams';
import getMatchWinStats from './team/stats/getMatchWinStats';
import getPlayerStats from './team/stats/getPlayerStats';
import getTeamStats from './team/stats/getTeamStats';
import getTeamByCode from './team/getTeamByCode';

const route = Router();

export default (app: Router) => {
  app.use('/teams', route);
  ///code/:invitationCode
  getTeamByCode(app, route);
  ///:teamId/win
  getMatchWinStats(app, route);
  ///:teamId/stats/user/:userId'
  getPlayerStats(app, route);
  ///:teamId/stats/
  getTeamStats(app, route);
  ///:teamId/code - post
  refreshInvitationCode(app, route);
  ///:teamId/code - get
  getInvitationCode(app, route);
  ///:teamId/members/
  joinTeam(app, route);
  ///:teamId/members/:userId
  removeMember(app, route);
  ///:teamId/members/:userId
  getMember(app, route);
  ///:teamId/members/:userId
  updateMember(app, route);
  ///:teamId/members/
  getAllMembers(app, route);
  getTeams(app, route);
  getTeam(app, route);
  createTeam(app, route);
  deleteTeam(app, route);
  updateTeam(app, route);
  return app;
};
