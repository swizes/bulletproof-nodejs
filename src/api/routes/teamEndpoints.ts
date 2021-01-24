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

const route = Router();

export default (app: Router) => {
  app.use('/teams', route);
  createTeam(app, route);
  deleteTeam(app, route);
  updateTeam(app, route);
  getTeam(app, route);
  joinTeam(app, route);

  removeMember(app, route);
  refreshInvitationCode(app, route);
  getInvitationCode(app, route);
  getAllMembers(app, route);
  getMember(app, route);
  updateMember(app, route);
  return app;
};
