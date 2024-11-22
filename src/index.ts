import app from "./app";
import customLogger from "./app/middleware/logger.middleware";
import config from "./config";
import { connectToDatabase } from "./core/scripts/db.connection";
const PORT = config.PORT ?? 8080;

app.listen(PORT, async () => {
  await connectToDatabase();
  customLogger.info(`🚀 ~ app.listen ~ PORT: ${PORT}`);
});
