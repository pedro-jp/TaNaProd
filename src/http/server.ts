import express from 'express';
import { router } from './routes';
import { date } from '../utils/data';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3332;
app.get('/', (req, res) => {
  res.send('Hello World - ' + date);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} - ${date}`);
});
