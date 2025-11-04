import { Router } from 'express';

import * as coursesController from './controller';

const coursesModule = Router();

coursesModule.get('/', coursesController.getCourses);
coursesModule.get('/:id', coursesController.getCourse);
coursesModule.post('/', coursesController.createCourse);
coursesModule.patch('/:id', coursesController.updateCourse);
coursesModule.delete('/:id', coursesController.deleteCourse);

export default coursesModule;
