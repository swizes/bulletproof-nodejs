import { Schema } from 'mongoose';

export interface IDevice {
  deviceId: string;
  token: string;
  userIds: string[];
  isMobile: boolean;
}
