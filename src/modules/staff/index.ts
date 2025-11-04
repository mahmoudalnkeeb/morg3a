import { Router } from 'express';

import * as staffController from './controller';

const staffModule = Router();

staffModule.get('/', staffController.getStaff);
staffModule.get('/:id', staffController.getStaffMember);
staffModule.post('/', staffController.createStaff);
staffModule.patch('/:id', staffController.updateStaff);
staffModule.delete('/:id', staffController.deleteStaff);

export default staffModule;
