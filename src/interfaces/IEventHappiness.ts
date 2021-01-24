export interface IEventHappiness {
  _id: string;
  mental: number;
  physical: number;
  teamId: string;
  userId: string;
  contentId: string;
  contentType: string;
}

export interface IEventHappinessDTO {
  mental: number;
  physical: number;
  teamId: string;
  userId: string;
  contentId: string;
  contentType: string;
}
