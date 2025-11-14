import { app } from "./app.js";
import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is started at port", port);
});
