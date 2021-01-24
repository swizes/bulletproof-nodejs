export interface IEvent {
  _id: string;
  startDate: string;
  endDate?: string;
  contentType: string;
  contentId: string;
  title: string;
  teamId: string;
  location: {
    address: string;
    position?: {
      lat: number;
      lng: number;
    };
    placeId: string;
  };
}
