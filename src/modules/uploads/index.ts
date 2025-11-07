import { Router } from 'express';

import * as uploadsController from './contoller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const uploadsModule = Router();

uploadsModule.use(authenticate);

uploadsModule
  .route('/part')
  .post(authorize(['admin', 'teacher']), uploadsController.upload)
  .delete(authorize(['admin', 'teacher']), uploadsController.abortUpload);

export default uploadsModule;
