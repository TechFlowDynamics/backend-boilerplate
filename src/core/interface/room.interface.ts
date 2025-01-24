

export interface CreateRoomInput {
  roomName: string;
  questionIds: string[];
  status: string;
  startTime: Date; // ISO Date expected
  endTime: Date;   // ISO string expected
  userId: string;
}

export interface Room extends CreateRoomInput {
  roomCode: string;
  roomHash: string;
  users: string[];
  duration: number;
}

