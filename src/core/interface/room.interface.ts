export enum RoomType {
  Public = "public",
  Private = "private",
}

export enum RoomStatus {
  Active = "active",
  Inactive = "inactive",
  Scheduled = "scheduled",
}

export interface IRoom {
  roomName: string;
  questionIds: string[];
  type: RoomType; // Using enums for better type safety
  startTime: Date;
  endTime: Date;
  duration: number;
  roomCode?: string;
  roomHash?: string;
  users: string[];
  userId: string;
  roomSize: number;
  credits: string;
  status: RoomStatus; // Using enums for status
  active: boolean;
  createdAt: Date;
  expiresAt?: Date; // Optional expiry field
}
