import app from "./app";
import http from "http";
import customLogger from "./app/middleware/logger.middleware";
import config from "./config";
import { connectToDatabase } from "./core/scripts/db.connection";
import { setupWebSocket } from "./core/scripts/websocket.connection";
const PORT = config.PORT ?? 8080;

const server = http.createServer(app);

setupWebSocket(server);
app.listen(PORT, async () => {
  await connectToDatabase();
  customLogger.info(`🚀 ~ app.listen ~ PORT: ${PORT}`);
});
