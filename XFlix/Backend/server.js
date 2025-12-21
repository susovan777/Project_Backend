import { configDotenv } from 'dotenv';
import app from './app.js';
configDotenv();

const port = process.env.PORT;

app.listen(port, () => {
  console.log('🛜 Server started on port:', port);
  console.log(`🔗 API base: http://localhost:${port}/api/v1`);
});
