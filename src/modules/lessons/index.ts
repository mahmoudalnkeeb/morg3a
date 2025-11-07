import { Router } from 'express';

import * as lessonsController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const lessonsModule = Router();

lessonsModule.use(authenticate);

lessonsModule
  .route('/')
  .get(lessonsController.getLessons)
  .post(authorize(['admin', 'teacher']), lessonsController.createLesson);

lessonsModule
  .route('/:id')
  .get(lessonsController.getLesson)
  .patch(authorize(['admin', 'teacher']), lessonsController.updateLesson)
  .delete(authorize(['admin', 'teacher']), lessonsController.deleteLesson);

export default lessonsModule;
