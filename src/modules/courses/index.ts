import { Router } from 'express';

import * as coursesController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const coursesModule = Router();

coursesModule.use(authenticate);

coursesModule
  .route('/')
  .get(coursesController.getCourses)
  .post(authorize(['admin', 'teacher']), coursesController.createCourse);

coursesModule
  .route('/:id')
  .get(coursesController.getCourse)
  .patch(authorize(['admin', 'teacher']), coursesController.updateCourse)
  .delete(authorize(['admin', 'teacher']), coursesController.deleteCourse);

export default coursesModule;
