import mongoose, { Schema } from "mongoose";
import { IRoom } from "src/core/interface/room.interface";

const roomSchema: Schema = new Schema(
  {
    roomName: { type: String, required: true },
    roomCode: { type: String, required: true, unique: true, index: true },
    roomHash: { type: String, required: true, unique: true, index: true },
    // users: { type: [String], required: true }, // Array of userIds
    questionIds: { type: [String], required: true },
    type: { type: String, enum: ["public", "private"], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    userId: { type: String, required: true, index: true }, // Store userId as userId,
    createdAt: { type: Date, default: Date.now },
    roomSize: { type: Number, required: true },
    credits: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "scheduled"],
      required: true,
      default: "active",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const RoomModel = mongoose.model<IRoom>("Room", roomSchema);

export default RoomModel;
