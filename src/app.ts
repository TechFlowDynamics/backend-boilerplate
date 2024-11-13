import express from "express";
import cors from "cors";

import routes from "./app/routes/index.routes";
import { setupLogger } from "./app/middleware/logger.middleware";

const app = express();
setupLogger(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/v1", routes);

export default app;
