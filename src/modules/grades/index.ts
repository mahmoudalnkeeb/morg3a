import { Router } from 'express';

import * as gradesController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const gradesModule = Router();

gradesModule.use(authenticate);

gradesModule
  .route('/')
  .get(gradesController.getGrades)
  .post(authorize(['admin', 'teacher']), gradesController.createGrade);

gradesModule
  .route('/:id')
  .get(gradesController.getGrade)
  .patch(authorize(['admin', 'teacher']), gradesController.updateGrade)
  .delete(authorize(['admin', 'teacher']), gradesController.deleteGrade);

export default gradesModule;
