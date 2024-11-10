import app from "./app";
import config from "./config";
import { connectToDatabase } from "./core/scripts/db.connection";

const PORT = config.PORT ?? 8081;

app.listen(PORT, async () => {
  console.log("🚀 ~ app.listen ~ PORT:", `http:/localhost:${PORT}`);
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    console.log("Process has been terminated due to db connection failure!!");
    process.exit(0);
  }
});
