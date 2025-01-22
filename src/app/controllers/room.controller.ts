import { NextFunction, Request, Response } from "express";

import {
  createRoomService,
  getPublicRoomsService,
  joinRoomService,
} from "../service/room.service";

// Controller: Handles the request and response
export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomName, questionIds, status, startTime, endTime } = req.body;

    // Validate and ensure userId is a string
    const userId = req.userData?.userId?.toString();
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: Missing user ID" });
      return;
    }

    // Validate input fields
    if (!roomName || !questionIds || !status || !startTime || !endTime) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      res
        .status(400)
        .json({ message: "questionIds must be a non-empty array" });
      return;
    }

    if (!["public", "private"].includes(status)) {
      res
        .status(400)
        .json({ message: "Status must be 'public' or 'private'." });
      return;
    }

    // Call the service
    const roomData = await createRoomService({
      roomName,
      questionIds,
      status,
      startTime,
      endTime,
      userId, // Ensure it's passed as a string
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
    const userId = req.userData?.userId.toString(); // Assuming middleware adds `userData` to `req`

    if (!roomCode) {
      res.status(400).json({ message: "Room code is required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing" });
      return;
    }

    // Call the service
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

// Get all public rooms with pagination and latest created filter
export const getPublicRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Parse page and limit as integers
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber <= 0) {
      res.status(400).json({ message: "Invalid page number" });
      return;
    }

    if (isNaN(limitNumber) || limitNumber <= 0) {
      res.status(400).json({ message: "Invalid limit value" });
      return;
    }

    // Call the service
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
