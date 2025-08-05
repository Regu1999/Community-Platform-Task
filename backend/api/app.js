import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import 'dotenv/config';

import authRouter from "../src/routes/auth.js"
import connectDb from '../src/config/db.js';
import { NotFoundError } from '../src/util/errors.js';
const app = express();

app.use(bodyParser.json());
app.use(cookieParser())

const CROS_ORIGIN_URL = process.env.CROS_ORIGIN_URL;

app.use(cors({
  origin: CROS_ORIGIN_URL,
  credentials: true
}));

app.use(authRouter);

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  const error = new NotFoundError('404 - Not Found')
  res.status(error.status).json({ message: error.message });
});

app.use((err, req, res, next) => {
  const message = err.message || "Unable to process, Try again later";
  const status = err.status || 500;
  const info = err.info || null;
  return res.status(status).json({
    message,
    info
  })
})

connectDb().catch(() => {
  throw new Error("unable to connect db")
})
app.listen(process.env.PORT);
