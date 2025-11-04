import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config, logger } from '@/config';
import { db } from '@/db';
import errorHandler from '@/middlewares/error';
import notFound from '@/middlewares/notFound';
import coursesModule from '@/modules/courses';
import gradesModule from '@/modules/grades';
import lessonsModule from '@/modules/lessons';
import quizzesModule from '@/modules/quizzes';
import staffModule from '@/modules/staff';
import studentsModule from '@/modules/students';
import supportModule from '@/modules/support';
import uploadsModule from '@/modules/uploads';

const app = express();

db.execute('SELECT 1')
  .then(() => {
    logger.info('Database connection successful');
  })
  .catch((error) => {
    logger.error('Database connection failed:', error);
  });

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const apiRouter = express.Router();

apiRouter.use(cors(config.corsOptions));
apiRouter.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    dnsPrefetchControl: { allow: false },
  }),
);

// Register modules
apiRouter.use('/students', studentsModule);
apiRouter.use('/grades', gradesModule);
apiRouter.use('/staff', staffModule);
apiRouter.use('/courses', coursesModule);
apiRouter.use('/lessons', lessonsModule);
apiRouter.use('/quizzes', quizzesModule);
apiRouter.use('/support', supportModule);
apiRouter.use('/upload', uploadsModule);

app.use('/api', apiRouter);

// Global middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
