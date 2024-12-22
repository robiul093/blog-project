import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoute } from './module/user/user.route';
import { BlogRoute } from './module/blog/blog.route';
import auth from './middlewares/auth';
import { adminRoute } from './module/admin/admin.route';


const app: Application = express();

// parser
app.use(express.json())
app.use(cors());


app.use('/api/auth', UserRoute);
app.use('/api/blogs', BlogRoute);
app.use('/api/admin', adminRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('This is blog project!')
});




app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errors: err || undefined,
    stack: err.stack || undefined,
  });
})



export default app;