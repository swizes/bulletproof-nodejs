export interface ITeam {
  _id: string;
  name: string;
  shortName: string;
  ownerId: string;
  members?: [
    {
      userId: string;
      mainRole?: number;
      sideRoles?: number[];
      position: string;
      style: string;
    },
  ];
  invitationCode?: string;
}

export interface ITeamJoinMemberDTO {
  userId: string;
  isPlayer?: boolean;
  selectedPos: string;
  selectedStyle?: string;
}

export interface ITeamInputDTO {
  name: string;
  shortName: string;
}
