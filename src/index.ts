import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './routers';
import { dbConnect } from './config/db_connect';
import * as dotenv from 'dotenv';


// Load the environment variables from the .env file
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
}


dbConnect();
const app = express();


app.use (cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/',router());

const server = http.createServer(app)

server.listen(process.env.DB_PORT, () => {
    console.log('Server running');
})