import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  getPublicRoomsService,
  joinRoomService,
} from "../service/room.service";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomName, questionIds, status, startTime, endTime } = req.body;

    const userId = req.userData?.userId?.toString();
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: Missing user ID" });
      return;
    }

    if (!roomName || !questionIds || !status || !startTime || !endTime) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
      res.status(400).json({ message: "questionIds must be a non-empty array" });
      return;
    }

    if (!["public", "private"].includes(status)) {
      res.status(400).json({ message: "Status must be 'public' or 'private'." });
      return;
    }

    if (isNaN(Date.parse(startTime)) || isNaN(Date.parse(endTime))) {
      res.status(400).json({ message: "Invalid startTime or endTime format" });
      return;
    }

    const roomData = await createRoomService({
      roomName,
      questionIds,
      status,
      startTime,
      endTime,
      userId,
    });

    res.status(201).json(roomData);
  } catch (error) {
    console.error("Error creating room:", error);
    next(error);
  }
};

export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomCode } = req.body;
    const userId = req.userData?.userId.toString();

    if (!roomCode || typeof roomCode !== 'string') {
      res.status(400).json({ message: "Room code must be a string" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing" });
      return;
    }

    const roomData = await joinRoomService(roomCode, userId);

    res.status(200).json({
      message: "User successfully added to the room",
      room: roomData,
    });
  } catch (error) {
    console.error("Error joining room:", error);
    next(error);
  }
};

export const getPublicRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;

    if (pageNumber <= 0 || limitNumber <= 0) {
      res.status(400).json({ message: "Page and limit must be positive integers" });
      return;
    }

    const publicRooms = await getPublicRoomsService(pageNumber, limitNumber);

    res.status(200).json({
      message: "Public rooms fetched successfully",
      ...publicRooms,
    });
  } catch (error) {
    console.error("Error fetching public rooms:", error);
    next(error);
  }
};
