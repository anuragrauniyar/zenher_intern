import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes.js';
import { errorHandler } from './middleware/error.middleware.js'; 
import { AppError } from './utils/AppError.js'; // Don't forget to import this

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

app.use('/api/posts', postRoutes);

// Add this: Catch-all for unknown routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Must be absolutely last
app.use(errorHandler);

export default app;