import { Router } from 'express';

import * as uploadsController from './contoller';

const uploadsModule = Router();

uploadsModule
  .route('/part')
  .post(uploadsController.upload)
  .delete(uploadsController.abortUpload);

export default uploadsModule;
