import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import RoomModel from "../../data/models/room.model";

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create a new room
export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomName, questionId, status, startTime, endTime } = req.body;
    const token = req.header("access-token")?.replace("Bearer ", ""); // Extract token from header

    // Validate token
    if (!token) {
      res.status(401).json({ message: "Authorization token is missing" });
      return;
    }

    let decodedToken: JwtPayload | string;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
      console.log("decodedToken", decodedToken);
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const roomOwner = (decodedToken as JwtPayload)?.userId;
    console.log("roomOwner", roomOwner);
    if (!roomOwner) {
      res
        .status(401)
        .json({ message: "Invalid token payload: user ID is missing" });
      return;
    }

    // Validate input fields
    if (!roomName || !questionId || !status || !startTime || !endTime) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    if (!["public", "private"].includes(status)) {
      res
        .status(400)
        .json({ message: "Status must be 'public' or 'private'." });
      return;
    }

    // Validate time fields
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ message: "Invalid startTime or endTime format" });
      return;
    }

    if (end <= start) {
      res.status(400).json({ message: "endTime must be later than startTime" });
      return;
    }

    // Calculate the duration (in minutes)
    const duration = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60),
    );

    // Ensure roomCode is unique
    let roomCode = generateRoomCode();
    while (await RoomModel.findOne({ roomCode })) {
      roomCode = generateRoomCode();
    }

    // Generate a hashed room identifier
    const saltRounds = 10;
    const roomHash = await bcrypt.hash(
      Math.random().toString(36).substring(2, 8).toUpperCase(),
      saltRounds,
    );

    // Create the new room with the roomOwner as the first user
    const newRoom = new RoomModel({
      roomName,
      roomCode,
      roomHash,
      users: [roomOwner],
      questionId,
      status,
      startTime: start,
      endTime: end,
      duration,
      roomOwner,
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();

    // Respond with the saved room (omit sensitive data like roomHash)
    const { roomHash: _, ...roomData } = savedRoom.toObject(); // Exclude roomHash from the response
    res.status(201).json({ ...roomData });
  } catch (error) {
    console.error("Error creating room:", error);
    next(error);
  }
};

// Join an existing room
export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { roomCode } = req.body;
    const token = req.header("access-token")?.replace("Bearer ", "");

    if (!roomCode || !token) {
      res.status(400).json({ message: "Missing required fields or token" });
      return;
    }

    let decodedToken: JwtPayload | string;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const userId = (decodedToken as JwtPayload)?.userId;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Invalid token payload: user ID is missing" });
      return;
    }

    // Find the room by roomCode
    const room = await RoomModel.findOne({ roomCode });

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    // Check if the current time is within the room's active duration
    const currentTime = new Date();
    if (currentTime < room.startTime || currentTime > room.endTime) {
      res.status(403).json({ message: "Room is not active at this time" });
      return;
    }

    // Check if the user is already in the room
    if (room.users.includes(userId)) {
      res.status(400).json({ message: "User already in the room" });
      return;
    }

    // Add the user to the room's users array
    room.users.push(userId);

    // Save the updated room
    await room.save();

    // Respond with the updated room details
    const { roomHash, ...roomData } = room.toObject();
    res.status(200).json({ message: "User added to the room", room: roomData });
  } catch (error) {
    console.error("Error joining room:", error);
    next(error);
  }
};

// Get all public rooms
export const getPublicRooms = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const publicRooms = await RoomModel.find({ status: "public" });

    if (!publicRooms || publicRooms.length === 0) {
      res.status(404).json({ message: "No public rooms found" });
      return;
    }

    res.status(200).json({
      message: "Public rooms fetched successfully",
      rooms: publicRooms,
    });
  } catch (error) {
    console.error("Error fetching public rooms:", error);
    next(error);
  }
};
