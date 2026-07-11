import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes.js';
import { errorHandler } from './middleware/error.middleware.js'; 
import { AppError } from './utils/AppError.js'; 

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

export default app;