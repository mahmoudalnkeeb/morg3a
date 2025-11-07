import { Router } from 'express';
import * as supportController from './controller';
import { authenticate } from '@/middlewares/authentication';
import { authorize } from '@/middlewares/authorization';

const supportModule = Router();

supportModule.use(authenticate);

supportModule
  .route('/tickets')
  // internal authorization required
  .get(supportController.getSupportTickets)
  .post(supportController.createSupportTicket);

supportModule
  .route('/tickets/:id')
  .get(supportController.getSupportTicket)
  // those can be done by a staff or the student opened the ticket
  .patch(supportController.updateSupportTicket)
  .delete(supportController.deleteSupportTicket);

supportModule
  .route('/faq/folders')
  .get(supportController.getFaqFolders)
  .post(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.createFaqFolder,
  );

supportModule
  .route('/faq/folders/:id')
  .get(supportController.getFaqFolder)
  .patch(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.updateFaqFolder,
  )
  .delete(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.deleteFaqFolder,
  );

supportModule
  .route('/faq')
  .get(supportController.getFaqQuestions)
  .post(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.createFaqQuestion,
  );

supportModule
  .route('/faq/:id')
  .get(supportController.getFaqQuestion)
  .patch(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.updateFaqQuestion,
  )
  .delete(
    authorize(['admin', 'teacher', 'support_agent']),
    supportController.deleteFaqQuestion,
  );

export default supportModule;
