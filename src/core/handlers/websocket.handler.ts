import { WebSocket, WebSocketServer } from "ws";
import { isUserInRoom, getRoomUsers } from "../../app/service/rooms.service";
import { saveMessage } from "../../app/service/message.service";
import { CustomWebSocket } from "../scripts/websocket.connection";

export const handleWebSocketEvents = (
  ws: CustomWebSocket,
  wss: WebSocketServer,
) => {
  ws.on("message", async rawMessage => {
    const data = JSON.parse(rawMessage.toString());
    let response;

    switch (data.type) {
      case "send-message":
        // Validate if user is in the room
        const isMember = await isUserInRoom(data.roomId, data.userId);

        if (!isMember) {
          response = { error: "You are not a member of this room" };
        } else {
          // Save the message
          await saveMessage(data.roomId, data.userId, data.message);

          // Retrieve the list of users in the room
          const users = await getRoomUsers(data.roomId);

          // Broadcast the message to all users in the room
          wss.clients.forEach((client: WebSocket) => {
            // Type assertion to treat 'client' as 'CustomWebSocket'
            const customClient = client as CustomWebSocket;

            if (
              customClient.readyState === WebSocket.OPEN &&
              users.includes(customClient.id)
            ) {
              customClient.send(
                JSON.stringify({
                  roomId: data.roomId,
                  userId: data.userId,
                  message: data.message,
                }),
              );
            }
          });

          response = { success: true, message: "Message sent" };
        }
        break;

      default:
        response = { error: "Unknown message type" };
    }

    ws.send(JSON.stringify(response));
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
};
