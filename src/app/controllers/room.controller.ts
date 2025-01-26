import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  getPublicRoomsService,
  joinRoomService,
} from "../service/room.service";
import { responseHandler } from "../../core/handlers/response.handlers";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      roomName,
      questionIds,
      type,
      startTime,
      endTime,
      roomSize,
      credits,
    } = req.body; 

    const userId = req.userData?.userId?.toString(); 
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: Missing user ID" });
      return;
    }

    // Call the service
    const createdRoom = await createRoomService({
      roomName,
      questionIds,
      type,
      startTime,
      endTime,
      userId,
      roomSize,
      credits,
    });

    // Respond with the created room
    responseHandler(
      res,
      { room: createdRoom },
      200,
      "Room created successfully",
    );
  } catch (error) {
    console.error("Error creating room:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomCode } = req.value;
    const userId = req.userData?.userId.toString();

    if (!roomCode || typeof roomCode !== "string") {
      res.status(400).json({ message: "Room code must be a string" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing" });
      return;
    }

    const roomData = await joinRoomService(roomCode, userId);

    responseHandler(res, { room: roomData }, 200, "Joined room successfully");
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
      res
        .status(400)
        .json({ message: "Page and limit must be positive integers" });
      return;
    }

    const publicRooms = await getPublicRoomsService(pageNumber, limitNumber);

    responseHandler(
      res,
      { rooms: publicRooms },
      200,
      "Public rooms fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching public rooms:", error);
    next(error);
  }
};
