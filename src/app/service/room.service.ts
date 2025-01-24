// import { Room } from './room.interface'; // Adjust the path as needed
import bcrypt from 'bcrypt';
import { countPublicRoomsDAL, createRoomDAL, fetchPublicRoomsDAL, findRoomByCodeDAL, updateRoomUsersDAL } from '../../data/dal/room.dal'; 
import { CreateRoomInput, Room } from 'src/core/interface/room.interface';
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
}: CreateRoomInput): Promise<Room> => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid startTime or endTime format');
  }

  if (end <= start) {
    throw new Error('endTime must be later than startTime');
  }

  const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  let roomCode = generateRoomCode();

  while (await findRoomByCodeDAL(roomCode)) {
    roomCode = generateRoomCode();
  }

  const saltRounds = 10;
  const roomHash = await bcrypt.hash(
    Math.random().toString(36).substring(2, 8).toUpperCase(),
    saltRounds,
  );

  const newRoom: Room = {
    roomName,
    questionIds,
    status,
    startTime: start,
    endTime: end,
    duration,
    roomCode,
    roomHash,
    users: [userId],
    userId,
  };

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