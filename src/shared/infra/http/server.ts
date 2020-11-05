import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '../typeorm/index';
import '../../container';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '../../errors/AppError';

const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
