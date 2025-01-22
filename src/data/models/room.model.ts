import mongoose, { Schema } from "mongoose";
import { Room } from "src/core/interface/room.interface";

const roomSchema: Schema = new Schema(
  {
    roomName: { type: String, required: true },
    roomCode: { type: String, required: true, unique: true },
    roomHash: { type: String, required: true },
    users: { type: [String], required: true }, // Array of userIds
    questionId: { type: [String], required: true },
    status: { type: String, enum: ["public", "private"], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    userId: { type: String, required: true }, // Store userId as userId,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
roomSchema.index({ roomCode: 1 }); // Unique index on roomCode (already unique)
const RoomModel = mongoose.model<Room>("Room", roomSchema);

export default RoomModel;
