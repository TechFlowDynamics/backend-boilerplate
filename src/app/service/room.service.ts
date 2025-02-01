import bcrypt from "bcrypt";
import {

  countRoomsDAL,
  createRoomDAL,
  exitRoomDal,
 
  fetchRoomsDAL,
 
  findRoomByCodeDAL,
  updateRoomUsersDAL,
} from "../../data/dal/room.dal";
import {
  IRoom,
  RoomStatus,
  RoomType,
} from "../../core/interface/room.interface";

/**
 * Generate a random 6-character room code.
 */
export const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Service to create a new room.
 */
export const createRoomService = async ({
  roomName,
  questionIds,
  type,
  startTime,
  endTime,
  userId,
  roomSize,
  credits,
}: {
  roomName: string;
  questionIds: string[];
  type: RoomType;
  startTime: string;
  endTime: string;
  userId: string;
  roomSize: number;
  credits: string;
}): Promise<IRoom> => {
  // Validate time fields
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(
      "Invalid startTime or endTime format. Please use a valid date format.",
    );
  }
  if (end <= start) {
    throw new Error("endTime must be later than startTime.");
  }

  // Validate roomSize and credits
  if (roomSize <= 0) {
    throw new Error("roomSize must be greater than 0.");
  }

  // Calculate the duration
  const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));

  // Generate roomCode and roomHash for private rooms
  let roomCode: string | undefined;
  let roomHash: string | undefined;
  if (type === RoomType.Private) {
    do {
      roomCode = generateRoomCode();
    } while (await findRoomByCodeDAL(roomCode)); // Ensure uniqueness

    const saltRounds = 10;
    roomHash = await bcrypt.hash(
      Math.random().toString(36).substring(2, 8).toUpperCase(),
      saltRounds,
    );
  }

  // Prepare the room object
  const newRoom: IRoom = {
    roomName,
    questionIds,
    type,
    startTime: start,
    endTime: end,
    duration,
    ...(type === RoomType.Private && { roomCode, roomHash }),
    users: [userId],
    userId,
    roomSize,
    credits,
    status: RoomStatus.Active,
    active: true,
    createdAt: new Date(),
  };

  // Save to database
  return await createRoomDAL(newRoom);
};

/**
 * Service to fetch public rooms with pagination.
 */

export const getRoomsService = async (page: number, limit: number) => {
  if (page <= 0 || limit <= 0) {
    throw new Error("Page and limit must be greater than 0.");
  }

  const skip = (page - 1) * limit;
  const currentTime = new Date();

  // Fetch only active rooms (endTime > current time) and count in parallel
  const [rooms, totalRooms] = await Promise.all([
    fetchRoomsDAL(skip, limit, currentTime), // Pass current time to filter active rooms
    countRoomsDAL(currentTime), // Count only active rooms
  ]);

  if (!rooms.length) {
    throw new Error("No active rooms found.");
  }

  return {
    rooms,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalRooms / limit),
      totalRooms,
      pageSize: limit,
    },
  };
};


/**
 * Service to join a room by room code.
 */
export const joinRoomService = async (roomCode: string, userId: string) => {
  // Find room by roomCode
  const room = await findRoomByCodeDAL(roomCode);
  if (!room) {
    return { room: null, message: "room_not_found" };
  }

  const currentTime = new Date();

  // Check if the room has already ended
  if (currentTime > room.endTime) {
    return { room: null, message: "room_ended" };
  }

  // Check if the room has not started yet
  if (currentTime < room.startTime) {
    return { room: null, message: "room_not_started" };
  }

  // Check if the user is already in the room (allow reconnection)
  const isUserAlreadyInRoom = room.users.includes(userId);

  // Check if the room is full
  if (!isUserAlreadyInRoom && room.users.length >= room.roomSize) {
    return { room: null, message: "room_full" };
  }

  // Add user to the room if not already present
  if (!isUserAlreadyInRoom) {
    room.users.push(userId);
    await updateRoomUsersDAL(room);
    return { room, message: "new_user_joined" };
  }

  return { room, message: "already_joined" };
};

/**
 * Service to leave a room by room code.
 */
export const exitRoomService = async (roomCode: string, userId: string) => {
  const room = await findRoomByCodeDAL(roomCode);
  if (!room) {
    return { room: null, message: "room_not_found" };
  }

  // Remove user from room
  room.users = room.users.filter(id => id !== userId);

  // If the room is empty, delete it
  if (room.users.length === 0) {
    await exitRoomDal(roomCode);
    return { room: null, message: "room_deleted" };
  }

  await updateRoomUsersDAL(room);
  return { room, message: "user_left" };
};
