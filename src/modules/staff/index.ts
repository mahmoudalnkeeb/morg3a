import { Router } from 'express';

import * as staffController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const staffModule = Router();

staffModule.use(authenticate);

// TODO: review permissions
staffModule
  .route('/')
  .get(authorize(['admin', 'teacher']), staffController.getStaff)
  .post(authorize(['admin', 'teacher']), staffController.createStaff);

staffModule
  .route('/:id')
  .get(authorize(['admin', 'teacher']), staffController.getStaffMember)
  .patch(authorize(['admin', 'teacher']), staffController.updateStaff)
  .delete(authorize(['admin', 'teacher']), staffController.deleteStaff);

export default staffModule;
