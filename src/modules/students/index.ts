import { Router } from 'express';

import * as studentsController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const studentsModule = Router();

studentsModule.use(authenticate);

studentsModule
  .route('/')
  .get(authorize(['admin', 'teacher']), studentsController.getStudents)
  .post(authorize(['admin', 'teacher']), studentsController.createStudent);

/*
TODO: implement profile route for student own profile
it should include the following

- student info
- student grade
- courses owned by student
- my tickets

studentsModule.get('/profile');

*/

studentsModule
  .route('/:id')
  .get(authorize(['admin', 'teacher']), studentsController.getStudent)
  .patch(authorize(['admin', 'teacher']), studentsController.updateStudent)
  .delete(authorize(['admin', 'teacher']), studentsController.deleteStudent);

export default studentsModule;
