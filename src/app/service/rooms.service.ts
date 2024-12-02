import Redis from "ioredis";

const redis = new Redis();

export const isUserInRoom = async (roomId: string, userId: string) => {
  return await redis.sismember(`room:${roomId}`, userId);
};

export const getRoomUsers = async (roomId: string) => {
  return await redis.smembers(`room:${roomId}`);
};

export const joinRoom = async (roomId: string, userId: string) => {
  await redis.sadd(`room:${roomId}`, userId);
};

export const leaveRoom = async (roomId: string, userId: string) => {
  await redis.srem(`room:${roomId}`, userId);
};
