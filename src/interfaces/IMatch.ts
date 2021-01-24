export interface IMatch {
  _id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    address?: string;
    position: {
      lat?: number;
      lng?: number;
      default: null;
    };
    placeId?: string;
  };
  videos?: [
    {
      userId: string;
      videoUrl: string;
    },
  ];
  creatorId: string;
  teamId: string;
  opponentName: string;
  duration: number;
  extraTime?: number;
  size: number;
  squad?: [
    {
      userId: string;
      minute: number;
      onField: boolean;
      bookedOut: boolean;
    },
  ];
  subs?: string[];
  goals?: string[];
  others?: string[];
  bookings?: string[];
  timer?: {
    startTime: number;
    pauseTime: number;
    endTime: number;
  };
  awayGoals?: number;
  homeGoals?: number;
  isFinished?: boolean;
  result?: string;
}

export interface IMatchInputDTO {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    address?: string;
    position: {
      lat?: number;
      lng?: number;
      default: null;
    };
    placeId?: string;
  };
  creatorId: string;
  teamId: string;
  opponentName: string;
  duration: number;
  size: number;
}
