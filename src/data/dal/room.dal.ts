import RoomModel from "../../data/models/room.model";

// Find a room by room code
export const findRoomByCodeDAL = async (roomCode: string) => {
  return await RoomModel.findOne({ roomCode });
};

// Create a new room
export const createRoomDAL = async (roomData: any) => {
  const newRoom = new RoomModel(roomData);
  return await newRoom.save();
};

// Update a room's users
export const updateRoomUsersDAL = async (room: any) => {
  return await room.save();
};

// Fetch public rooms with pagination
export const fetchPublicRoomsDAL = async (skip: number, limit: number) => {
  return await RoomModel.find({ status: "public" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Count total public rooms
export const countPublicRoomsDAL = async () => {
  return await RoomModel.countDocuments({ status: "public" });
};