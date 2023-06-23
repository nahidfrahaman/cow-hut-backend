import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globarErrorHandler';
import routes from './app/route';
const app: Application = express();
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);
app.use(globalErrorHandler);

//testing purpuse
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
  res.status(400).json({
    success: false,
    message: 'route not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api route not Found',
      },
    ],
  });
});

export default app;
