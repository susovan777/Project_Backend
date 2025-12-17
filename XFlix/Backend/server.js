import { configDotenv } from "dotenv";
import app from "./app.js";
configDotenv();

const port = process.env.PORT;

app.listen(port, () => {
  console.log("🛜 Server started at port:", port);
});
