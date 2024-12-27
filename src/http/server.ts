import express from 'express';
import { router } from '../routes';
import { date } from '../utils/data';
import cors from 'cors';
import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';
config();

const app = express();
app.use(cors());
app.use(express.json());

const limite = 5;

// const limiter = rateLimit({
//   windowMs: limite * 60 * 1000, // 1 minuto
//   max: 1, // Limite de 1 requisição por IP
//   message: `Você excedeu o limite de 1 requisição a cada ${limite} minuto(s).`
// });

// app.use(limiter);

const PORT = process.env.PORT || 3332;
app.get('/', (req, res) => {
  res.send('Hello World - ' + date);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} - ${date}`);
});
