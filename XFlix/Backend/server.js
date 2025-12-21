import app from './app.js';
import { configDotenv } from 'dotenv';
import connectDB from './Config/db.js';
configDotenv();

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log('🛜 Server started on port:', port);
  console.log(`🔗 API base: http://localhost:${port}/api/v1`);
});
