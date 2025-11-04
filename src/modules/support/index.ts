import { Router } from 'express';

import * as supportController from './controller';

const supportModule = Router();

supportModule.get('/tickets', supportController.getSupportTickets);
supportModule.get('/tickets/:id', supportController.getSupportTicket);
supportModule.post('/tickets', supportController.createSupportTicket);
supportModule.patch('/tickets/:id', supportController.updateSupportTicket);
supportModule.delete('/tickets/:id', supportController.deleteSupportTicket);

supportModule.get('/faq/folders', supportController.getFaqFolders);
supportModule.get('/faq/folders/:id', supportController.getFaqFolder);
supportModule.post('/faq/folders', supportController.createFaqFolder);
supportModule.patch('/faq/folders/:id', supportController.updateFaqFolder);
supportModule.delete('/faq/folders/:id', supportController.deleteFaqFolder);

supportModule.get('/faq', supportController.getFaqQuestions);
supportModule.get('/faq/:id', supportController.getFaqQuestion);
supportModule.post('/faq', supportController.createFaqQuestion);
supportModule.patch('/faq/:id', supportController.updateFaqQuestion);
supportModule.delete('/faq/:id', supportController.deleteFaqQuestion);

export default supportModule;
