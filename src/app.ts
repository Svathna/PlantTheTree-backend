import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import routes from './routes';

if (process.env.DB_URI === undefined) throw Error('DB_URI is not defined in .env file.');

mongoose.connect(process.env.DB_URI as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('DB CONNECTED');
});
require('./config/cloudinary');
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  }),
);
app.use(bodyparser.json({ limit: '3mb' }));

app.use(routes);

module.exports = app;
