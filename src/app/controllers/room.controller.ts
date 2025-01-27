import { NextFunction, Request, Response } from "express";
import {
  createRoomService,
  getPublicRoomsService,
  joinRoomService,
} from "../service/room.service";
import { responseHandler } from "../../core/handlers/response.handlers";

/**
 * Create a new room.
 */
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

    // Validate required fields
    if (
      !roomName ||
      !questionIds ||
      !type ||
      !startTime ||
      !endTime ||
      !roomSize ||
      !credits
    ) {
      res.status(400).json({ message: "Missing required fields" });
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
    next(error);
  }
};

/**
 * Join an existing room by room code.
 */
export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomCode } = req.body; // Changed to `req.body` for simplicity

    const userId = req.userData?.userId?.toString();

    // Validate roomCode and userId
    if (!roomCode || typeof roomCode !== "string") {
      res.status(400).json({ message: "Invalid room code. Must be a string." });
      return;
    }
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing." });
      return;
    }

    // Call the service to join the room
    const roomData = await joinRoomService(roomCode, userId);
    console.log("roomData backed", roomData);  
    // Respond with the updated room data
    responseHandler(res, { room: roomData }, 200, "Joined room successfully");
  } catch (error) {
    console.error("Error joining room:", error);
    next(error);
  }
};

/**
 * Get public rooms with pagination.
 */
export const getPublicRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Validate pagination parameters
    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      res.status(400).json({ message: "Page and limit must be positive integers." });
      return;
    }

    // Fetch public rooms
    const publicRooms = await getPublicRoomsService(pageNumber, limitNumber);

    // Respond with public rooms and pagination data
    responseHandler(
      res,
      publicRooms,
      200,
      "Public rooms fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching public rooms:", error);
    next(error);
  }
};

