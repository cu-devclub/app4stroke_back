import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api';

dotenv.config();
const APP_PORT = process.env.APP_PORT;
const HOST_URL = process.env.HOST_URL;

const app = express();
const mg = morgan('dev');

app.use(cors());
app.use(mg);
app.use('/api', apiRouter);

app.listen(APP_PORT, (): void => {
  console.log(`Back-End server is running at ${<string>HOST_URL}`);
});
