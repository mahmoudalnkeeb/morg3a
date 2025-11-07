import { Router } from 'express';

import * as quizzesController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const quizzesModule = Router();

quizzesModule.use(authenticate);

quizzesModule
  .route('/')
  .get(quizzesController.getQuizzes)
  .post(authorize(['admin', 'teacher']), quizzesController.createQuiz);

quizzesModule
  .route('/:id')
  .get(quizzesController.getQuiz)
  .patch(authorize(['admin', 'teacher']), quizzesController.updateQuiz)
  .delete(authorize(['admin', 'teacher']), quizzesController.deleteQuiz);

export default quizzesModule;
