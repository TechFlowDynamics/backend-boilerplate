import express from "express";
import cors from "cors";
import config from "./config";
import { connectToReqDatabase } from "./core/scripts/db.connection";

import routes from "./app/routes/index.routes";
import { setupLogger } from "./app/middleware/logger.middleware";
import { errorHandler } from "./app/middleware/errors/errorHandler.middleware";

const app = express();
setupLogger(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use(connectToReqDatabase);

app.use("/api/v1", routes);

// app.use(errorHandler);

export default app;
