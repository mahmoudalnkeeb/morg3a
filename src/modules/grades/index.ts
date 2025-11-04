import { Router } from 'express';

import * as gradesController from './controller';

const gradesModule = Router();

gradesModule
  .route('/')
  .get(gradesController.getGrades)
  .post(gradesController.createGrade);

gradesModule
  .route('/:id')
  .get(gradesController.getGrade)
  .patch(gradesController.updateGrade)
  .delete(gradesController.deleteGrade);

export default gradesModule;
