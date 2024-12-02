import { roomExists } from "src/data/models/rooms.model";
import { saveMessage, getMessages } from "../../data/models/message.model";

export const saveMessageController = async (
  roomId: string,
  message: string,
) => {
  try {
    const roomExistsFlag = await roomExists(roomId);
    if (!roomExistsFlag) {
      return { success: false, message: "Room does not exist" };
    }
    interface resultInterface {
      success: number;
    }
    const result: number = await saveMessage(roomId, message);
    if (result.success) {
      return { success: true, message: "Message saved successfully" };
    }

    throw new Error("Error saving message");
  } catch (error) {
    return { success: false, message: error || "Error saving message" };
  }
};

// Controller to get messages from a room
export const getMessagesController = async (roomId: string) => {
  try {
    // Check if room exists
    const roomExistsFlag = await roomExists(roomId); // You may need to import roomExists from the room model
    if (!roomExistsFlag) {
      return { success: false, message: "Room does not exist" };
    }

    // Get messages from the room
    const messages = await getMessages(roomId);
    if (!messages.length) {
      return { success: false, message: "No messages in this room" };
    }

    return { success: true, messages };
  } catch (error) {
    return {
      success: false,
      message: error || "Error fetching messages",
    };
  }
};
