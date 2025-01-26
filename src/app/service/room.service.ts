import bcrypt from "bcrypt";
import {
  countPublicRoomsDAL,
  createRoomDAL,
  fetchPublicRoomsDAL,
  findRoomByCodeDAL,
  updateRoomUsersDAL,
} from "../../data/dal/room.dal";
import {
  IRoom,
  RoomStatus,
  RoomType,
} from "../../core/interface/room.interface";

export const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

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
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Validate time fields
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
  let roomCode: string | undefined;
  let roomHash: string | undefined;

  if (type === RoomType.Private) {
    // Generate unique roomCode
    roomCode = generateRoomCode();
    while (await findRoomByCodeDAL(roomCode)) {
      roomCode = generateRoomCode();
    }

    // Generate roomHash
    const saltRounds = 10;
    roomHash = await bcrypt.hash(
      Math.random().toString(36).substring(2, 8).toUpperCase(),
      saltRounds,
    );
  }

  // Prepare room object
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

  // Save to database via DAL
  return await createRoomDAL(newRoom);
};

export const getPublicRoomsService = async (page: number, limit: number) => {
  if (page <= 0 || limit <= 0) {
    throw new Error("Page and limit must be greater than 0");
  }

  const skip = (page - 1) * limit;

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
  const room = await findRoomByCodeDAL(roomCode);
  if (!room) {
    throw new Error(`Room with code ${roomCode} not found`);
  }

  const currentTime = new Date();
  if (currentTime < room.startTime || currentTime > room.endTime) {
    throw new Error(
      `Room "${room.roomName}" is not active. Active between ${room.startTime} and ${room.endTime}`,
    );
  }

  if (room.users.includes(userId)) {
    throw new Error("User is already in the room");
  }

  room.users.push(userId);
  return await updateRoomUsersDAL(room);
};
