import { eq } from 'drizzle-orm';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

import { type CreateFaqFolderDTO } from './dtos/create-faq-folder.dto';
import { type CreateFaqQuestionDTO } from './dtos/create-faq-question.dto';
import { type CreateSupportTicketDTO } from './dtos/create-support-ticket.dto';
import { type FaqFolderDTO } from './dtos/faq-folder.dto';
import { type FaqQuestionDTO } from './dtos/faq-question.dto';
import { type SupportTicketDTO } from './dtos/support-ticket.dto';
import { type UpdateFaqFolderDTO } from './dtos/update-faq-folder.dto';
import { type UpdateFaqQuestionDTO } from './dtos/update-faq-question.dto';
import { type UpdateSupportTicketDTO } from './dtos/update-support-ticket.dto';

import { supportTickets, faqFolders, faqQuestions } from '@/db/schema';

export function createSupportRepository(db: NodePgDatabase) {
  // Support Tickets
  async function getSupportTickets(page = 1, limit = 10): Promise<SupportTicketDTO[]> {
    const result: SupportTicketDTO[] = await db
      .select()
      .from(supportTickets)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getSupportTicket(id: number): Promise<SupportTicketDTO | null> {
    const ticket: SupportTicketDTO[] = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.id, id))
      .execute();

    return ticket[0] || null;
  }

  async function createSupportTicket(
    data: CreateSupportTicketDTO,
  ): Promise<SupportTicketDTO> {
    const ticket: SupportTicketDTO[] = await db
      .insert(supportTickets)
      .values(data)
      .returning();

    return ticket[0];
  }

  async function updateSupportTicket(
    id: number,
    data: UpdateSupportTicketDTO,
  ): Promise<SupportTicketDTO> {
    const ticket: SupportTicketDTO[] = await db
      .update(supportTickets)
      .set(data)
      .where(eq(supportTickets.id, id))
      .returning();

    return ticket[0];
  }

  async function deleteSupportTicket(id: number): Promise<SupportTicketDTO> {
    const ticket: SupportTicketDTO[] = await db
      .delete(supportTickets)
      .where(eq(supportTickets.id, id))
      .returning();

    return ticket[0];
  }

  // FAQ Folders
  async function getFaqFolders(page = 1, limit = 10): Promise<FaqFolderDTO[]> {
    const result: FaqFolderDTO[] = await db
      .select()
      .from(faqFolders)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getFaqFolder(id: number): Promise<FaqFolderDTO | null> {
    const folder: FaqFolderDTO[] = await db
      .select()
      .from(faqFolders)
      .where(eq(faqFolders.id, id))
      .execute();

    return folder[0] || null;
  }

  async function createFaqFolder(data: CreateFaqFolderDTO): Promise<FaqFolderDTO> {
    const folder: FaqFolderDTO[] = await db.insert(faqFolders).values(data).returning();

    return folder[0];
  }

  async function updateFaqFolder(
    id: number,
    data: UpdateFaqFolderDTO,
  ): Promise<FaqFolderDTO> {
    const folder: FaqFolderDTO[] = await db
      .update(faqFolders)
      .set(data)
      .where(eq(faqFolders.id, id))
      .returning();

    return folder[0];
  }

  async function deleteFaqFolder(id: number): Promise<FaqFolderDTO> {
    const folder: FaqFolderDTO[] = await db
      .delete(faqFolders)
      .where(eq(faqFolders.id, id))
      .returning();

    return folder[0];
  }

  // FAQ Questions
  async function getFaqQuestions(page = 1, limit = 10): Promise<FaqQuestionDTO[]> {
    const result: FaqQuestionDTO[] = await db
      .select()
      .from(faqQuestions)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getFaqQuestion(id: number): Promise<FaqQuestionDTO | null> {
    const question: FaqQuestionDTO[] = await db
      .select()
      .from(faqQuestions)
      .where(eq(faqQuestions.id, id))
      .execute();

    return question[0] || null;
  }

  async function createFaqQuestion(data: CreateFaqQuestionDTO): Promise<FaqQuestionDTO> {
    const question: FaqQuestionDTO[] = await db
      .insert(faqQuestions)
      .values(data)
      .returning();

    return question[0];
  }

  async function updateFaqQuestion(
    id: number,
    data: UpdateFaqQuestionDTO,
  ): Promise<FaqQuestionDTO> {
    const question: FaqQuestionDTO[] = await db
      .update(faqQuestions)
      .set(data)
      .where(eq(faqQuestions.id, id))
      .returning();

    return question[0];
  }

  async function deleteFaqQuestion(id: number): Promise<FaqQuestionDTO> {
    const question: FaqQuestionDTO[] = await db
      .delete(faqQuestions)
      .where(eq(faqQuestions.id, id))
      .returning();

    return question[0];
  }

  return {
    // Support Tickets
    getSupportTickets,
    getSupportTicket,
    createSupportTicket,
    updateSupportTicket,
    deleteSupportTicket,
    // FAQ Folders
    getFaqFolders,
    getFaqFolder,
    createFaqFolder,
    updateFaqFolder,
    deleteFaqFolder,
    // FAQ Questions
    getFaqQuestions,
    getFaqQuestion,
    createFaqQuestion,
    updateFaqQuestion,
    deleteFaqQuestion,
  };
}
