import Redis from "ioredis";

// Initialize Redis client
const redis = new Redis();

export const saveMessage = async (
  roomId: string,
  message: string,
): Promise<number> => {
  const timestamp = new Date().toISOString();
  return await redis.rpush(
    `messages:${roomId}`,
    JSON.stringify({ message, timestamp }),
  );
};

export const getMessages = async (roomId: string) => {
  return await redis.lrange(`messages:${roomId}`, 0, -1);
};
