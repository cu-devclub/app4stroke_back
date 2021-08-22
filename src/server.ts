import InitiateMongoServer from './config/database';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
// import bodyparser from 'body-parser';

import apiRouter from './routes/api';
import bodyParser from 'body-parser';

dotenv.config();
const APP_PORT = process.env.APP_PORT;
const HOST_URL = process.env.HOST_URL;

const app = express();
const mg = morgan('dev');

app.use(cors());
app.use(mg);
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', apiRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(handlebars),
  }),
);
app.set('view engine', 'hbs');

InitiateMongoServer();

app.listen(APP_PORT, (): void => {
  console.log(`Back-End server is running at ${<string>HOST_URL}`);
});
