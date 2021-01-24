import { Schema } from 'mongoose';

export interface ITraining {
  _id?: string;
  title: string;
  description: string;
  creatorId: string;
  location: {
    address?: string;
    position?: {
      lat: number;
      lng: number;
    };
    placeId?: string;
  };
  startDate: string;
  endDate?: string;
  videos?: [
    {
      userId: string;
      videoUrl: string;
    },
  ];
  teamId: string;
  attendances?: [
    {
      userId: string;
      status: number;
    },
  ];
  duration: number;
}

export interface ITrainingInputDTO {
  title: string;
  description: string;
  location: {
    address: string;
    position?: {
      lat: number;
      lng: number;
    };
    placeId: string;
  };
  startDate: string;
  endDate?: string;
  teamId: string;
  duration: number;
  creatorId: string;
}
