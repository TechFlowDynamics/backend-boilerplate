import express from "express";
import cors from "cors";
import config from "./config";

import routes from "./app/routes/index.routes";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use("/api/v1", routes);

export default app;
