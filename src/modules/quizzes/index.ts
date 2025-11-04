import { Router } from 'express';

import * as quizzesController from './controller';

const quizzesModule = Router();

quizzesModule.get('/', quizzesController.getQuizzes);
quizzesModule.get('/:id', quizzesController.getQuiz);
quizzesModule.post('/', quizzesController.createQuiz);
quizzesModule.patch('/:id', quizzesController.updateQuiz);
quizzesModule.delete('/:id', quizzesController.deleteQuiz);

export default quizzesModule;
