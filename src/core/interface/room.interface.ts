import { Document } from "mongoose";

export interface Room extends Document {
  roomName: string;           // Name of the room
  roomCode: string;           // Unique code for the room
  roomHash: string;           // Hashed identifier for the room
  users: string[];            // Array of user IDs (room participants)
  questionId: string;         // Associated question ID
  status: "public" | "private"; // Room status
  roomOwner: string;          // User ID of the room owner
  startTime: Date;            // Start time of the room
  endTime: Date;              // End time of the room
  duration: number;           // Duration of the room in minutes
}
