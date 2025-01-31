import { IRoom, RoomType } from "../../core/interface/room.interface";
import RoomModel, { IRoomDocument } from "../models/room.model"; // Assuming IRoomDocument is defined in the model

// Find a room by room code
export const findRoomByCodeDAL = async (roomCode: string): Promise<IRoomDocument | null> => {
  return await RoomModel.findOne({ roomCode });
};

// Create a new room
export const createRoomDAL = async (roomData: IRoom): Promise<IRoomDocument> => {
  const newRoom = new RoomModel(roomData);
  return await newRoom.save();
};

// Update a room's users
export const updateRoomUsersDAL = async (room: IRoomDocument): Promise<IRoomDocument> => {
  return await room.save();
};

// Fetch public rooms with pagination
export const fetchPublicRoomsDAL = async (skip: number = 0, limit: number = 10): Promise<IRoomDocument[]> => {
  return await RoomModel.find({ type: RoomType.Public }) // Use enum for type safety
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(limit);
};

// Count total public rooms
export const countPublicRoomsDAL = async (): Promise<number> => {
  return await RoomModel.countDocuments({ type: RoomType.Public }); // Use enum for type safety
};

export const exitRoomDal = async(roomId: string) : Promise<IRoomDocument | null> => {
  return await RoomModel.findByIdAndDelete(roomId);
}