export interface ITeam {
  _id: string;
  name: string;
  shortName: string;
  owner: string;
  members?: [
    {
      uid: string;
      mainRole: number;
      sideRoles: number[];
    },
  ];
}

export interface ITeamInputDTO {
  name: string;
  shortName: string;
  mainRole: number;
}
