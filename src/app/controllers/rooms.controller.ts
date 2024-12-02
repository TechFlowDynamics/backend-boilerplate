import {
  createRoom,
  getRooms,
  roomExists,
} from "../../data/models/rooms.model";

// Controller to create a room
export const createRoomController = async (roomId: string) => {
  try {
    // Check if room already exists
    if (await roomExists(roomId)) {
      return { success: false, message: "Room already exists" };
    }

    // Create the new room
    const result = await createRoom(roomId);
    if (result.success) {
      return { success: true, message: "Room created successfully" };
    }

    throw new Error("Error creating room");
  } catch (error) {
    return {
      success: false,
      message: error || "Internal server error",
    };
  }
};

// Controller to get all rooms
export const getRoomsController = async () => {
  try {
    const rooms = await getRooms();
    if (!rooms.length) {
      return { success: false, message: "No rooms available" };
    }
    return { success: true, rooms };
  } catch (error) {
    return { success: false, message: error || "Error fetching rooms" };
  }
};
