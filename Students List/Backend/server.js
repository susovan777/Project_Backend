import { app } from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Backend server started at port ${port}...`);
});
