import Redis from "ioredis";

// Initialize Redis client
const redis = new Redis();

// Create a room
export const createRoom = async (roomId: string) => {
  const result = await redis.sadd("rooms", roomId); // Add room to the "rooms" set
  return result
    ? { success: true }
    : { success: false, message: "Room already exists" };
};

// Get all rooms
export const getRooms = async () => {
  return await redis.smembers("rooms");
};

// Check if a room exists
export const roomExists = async (roomId: string) => {
  return await redis.sismember("rooms", roomId);
};
