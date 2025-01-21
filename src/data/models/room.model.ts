import mongoose, { Schema } from "mongoose";
import { Room } from "src/core/interface/room.interface";

const roomSchema: Schema = new Schema({
  roomName: { type: String, required: true },
  roomCode: { type: String, required: true, unique: true },
  roomHash: { type: String, required: true },
  users: { type: [String], required: true }, // Array of userIds
  questionId: { type: String, required: true },
  status: { type: String, enum: ["public", "private"], required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  roomOwner: { type: String, required: true }, // Store roomOwner as userId
});

const RoomModel = mongoose.model<Room>("Room", roomSchema);

export default RoomModel;
