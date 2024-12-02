import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { handleWebSocketEvents } from "../handlers/websocket.handler";

// Extending the WebSocket class to add an `id` property
export interface CustomWebSocket extends WebSocket {
  id: string;
}
export const setupWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    const customWs = ws as CustomWebSocket;
    console.log("New WebSocket connection established");
    handleWebSocketEvents(customWs, wss);
    // Listen for messages from clients
    ws.on("message", message => {
      console.log("Message received:", message.toString());
      // Echo the message back to the client
      ws.send(`Echo: ${message}`);
    });

    // Handle WebSocket disconnections
    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  console.log("WebSocket server initialized");
};
