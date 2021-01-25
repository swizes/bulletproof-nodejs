export interface IEventRating {
  _id?: string;
  rating: number;
  notes: string;
  category: string;
  parent: string;
  userId: string;
  teamId: string;
  givenBy: string;
  contentId: string;
  contentType: string;
}

export interface IEventRatingDTO {
  rating: number;
  notes: string;
  category: string;
  parent: string;
  userId: string;
  teamId: string;
  givenBy: string;
  contentId: string;
  contentType: string;
}
