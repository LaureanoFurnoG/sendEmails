import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import emailRouter from './controllers/nodeMailer.js';

const app = express();

app.use(helmet());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));


app.use('/sendEmail', emailRouter);

export default app