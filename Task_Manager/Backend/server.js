import app from './app.js';
import { configDotenv } from 'dotenv';

configDotenv();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('🛜  Server started at port', port);
});
