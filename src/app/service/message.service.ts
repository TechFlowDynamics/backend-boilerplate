import Redis from "ioredis";

const redis = new Redis();

export const saveMessage = async (
  roomId: string,
  userId: string,
  message: string,
) => {
  const timestamp = Date.now();
  const messageData = JSON.stringify({ userId, message, timestamp });

  await redis.rpush(`room:${roomId}:messages`, messageData);
};

export const getRoomMessages = async (roomId: string, limit: number = 50) => {
  const messages = await redis.lrange(`room:${roomId}:messages`, 0, limit - 1);
  return messages.map(msg => JSON.parse(msg));
};
