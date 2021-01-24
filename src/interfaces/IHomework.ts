import { Schema } from 'mongoose';

export interface IHomework {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
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
  videoUrl: string;
  submissions?: IHomeworkSubmission[];
}

export interface IHomeworkInputDTO {
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
  videoUrl: string;
}

export interface IHomeworkSubmission {
  _id?: string;
  userId: string;
  coachId?: string;
  videoUrl: string;
  rating: number;
  feedback?: string;
}

export interface IHomeworkSubmissionInputDTO {
  userId: string;
  videoUrl: string;
  rating: number;
}
