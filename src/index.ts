import app from "./app";
import customLogger from "./app/middleware/logger.middleware";
import config from "./config";
const PORT = config.PORT ?? 8080;

app.listen(PORT, async () => {
  customLogger.info(`🚀 ~ app.listen ~ PORT: ${PORT}`);
});
