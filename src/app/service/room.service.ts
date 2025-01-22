import bcrypt from "bcrypt";
import { createRoomDAL, findRoomByCodeDAL,countPublicRoomsDAL,fetchPublicRoomsDAL,updateRoomUsersDAL } from "../../data/dal/room.dal";
// import { createRoomDAL, findRoomByCodeDAL } from "../dal/room.dal";

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createRoomService = async ({
  roomName,
  questionIds,
  status,
  startTime,
  endTime,
  userId,
}: {
  roomName: string;
  questionIds: string[];
  status: string;
  startTime: string;
  endTime: string;
  userId: string;
}) => {
  // Validate time fields
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid startTime or endTime format");
  }

  if (end <= start) {
    throw new Error("endTime must be later than startTime");
  }

  // Calculate the duration (in minutes)
  const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));

  // Ensure roomCode is unique
  let roomCode = generateRoomCode();
  while (await findRoomByCodeDAL(roomCode)) {
    roomCode = generateRoomCode();
  }

  // Generate a hashed room identifier
  const saltRounds = 10;
  const roomHash = await bcrypt.hash(
    Math.random().toString(36).substring(2, 8).toUpperCase(),
    saltRounds,
  );

  // Prepare the room object
  const newRoom = {
    roomName,
    roomCode,
    roomHash,
    users: [userId],
    questionIds,
    status,
    startTime: start,
    endTime: end,
    duration,
    userId,
  };

  // Call the DAL to save the room
  return await createRoomDAL(newRoom);
};



export const getPublicRoomsService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Fetch public rooms and total count from the database
  const [publicRooms, totalRooms] = await Promise.all([
    fetchPublicRoomsDAL(skip, limit),
    countPublicRoomsDAL(),
  ]);

  if (publicRooms.length === 0) {
    throw new Error("No public rooms found");
  }

  const totalPages = Math.ceil(totalRooms / limit);

  return {
    rooms: publicRooms,
    pagination: {
      currentPage: page,
      totalPages,
      totalRooms,
      pageSize: limit,
    },
  };
};
export const joinRoomService = async (roomCode: string, userId: string) => {
    // Find the room by roomCode
    const room = await findRoomByCodeDAL(roomCode);
  
    if (!room) {
      throw new Error("Room not found");
    }
  
    // Check if the current time is within the room's active duration
    const currentTime = new Date();
    if (currentTime < room.startTime || currentTime > room.endTime) {
      throw new Error("Room is not active at this time");
    }
  
    // Check if the user is already in the room
    if (room.users.includes(userId.toString())) {
      throw new Error("User is already in the room");
    }
  
    // Add the user to the room's users array and update the database
    room.users.push(userId.toString());
    const updatedRoom = await updateRoomUsersDAL(room);
  
    return updatedRoom;
  };